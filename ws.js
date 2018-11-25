const mqtt = require('mqtt');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var requestgraph = require('graphql-request').request;
var moment = require('moment');
var request = require('request');


server.listen(3001);
// WARNING: app.listen(80) will NOT work here!

app.get('/', function (req, res) {
  res.sendStatus(200);
});

//<prefix><version>/journey/<temporal_type>/<transport_mode>/<operator_id>/<vehicle_number>/<route_id>/<direction_id>/<headsign>/<start_time>/<next_stop>/<geohash_level>/<geohash>/
const topic = '/hfp/v1/journey/ongoing/train/+/01067/+/+/+/+/+/+/#';

const client  = mqtt.connect('mqtts://mqtt.hsl.fi:443');

let doorStatus = 0;
let currentZone = null;


client.on('connect', ()=> {
    client.subscribe(topic);

    client.on('message', (topic, message) => {
        splitted_topic = topic.split('/')
        requestgraph('https://api.digitransit.fi/routing/v1/routers/hsl/index/graphql', `{ 
            stop(id: "HSL:`+splitted_topic[12]+`") {
              name
              lat
              lon
              zoneId
              platformCode
              stoptimesForPatterns(numberOfDepartures: 1) {
                pattern {
                  name
                }
                stoptimes {
                  realtimeArrival
                  arrivalDelay
                }
              }
            }
          }
        `).then((data)=>{
            //console.log(splitted_topic[12])
            //console.log(data.stop.stoptimesForPatterns);
            const vehicle_position = JSON.parse(message).VP;

            patterns = data.stop.stoptimesForPatterns.filter((x)=>{
                return (x.pattern.name.charAt(0) === vehicle_position.desi.charAt(0) && x.stoptimes.length > 0);
            })

            arrival = moment().startOf('day').add(patterns[0].stoptimes[0].realtimeArrival*1000)

            timeToArrive = moment.duration(arrival.diff(moment()));

            timeToArriveFormat = timeToArrive.minutes() +':'+ (timeToArrive.seconds() < 10 ? '0'+timeToArrive.seconds() : timeToArrive.seconds());

            switch(data.stop.zoneId) {
                case "01":
                    zone = "Helsinki";
                    break;
                case "02":
                    zone = "Espoo";
                    break;
                case "04":
                    zone = "Vantaa";
                    break;
                default:
                    zone = data.stop.zoneId;
            }

            if (currentZone !== null && zone !== currentZone) {
                request.get('http://localhost:3000/train/new-zone');
            }
            currentZone = zone;

            if (doorStatus !== vehicle_position.drst) {
                if (doorStatus === 0) {
                    console.log('arrived');
                    io.emit('arrivedAt', {station: splitted_topic[12]});
                } else {
                    console.log('departed');
                    io.emit('departedFrom', {});
                }
                doorStatus = vehicle_position.drst;
            }

            event = {
                line: vehicle_position.desi,
                destination: splitted_topic[10],
                vehicle: splitted_topic[7],
                status: {
                    zone,
                    nextStop: data.stop.name,
                    nextStopId: splitted_topic[12],
                    doorsOpened: vehicle_position.drst === 1,
                    arrivingAt: timeToArriveFormat
                }
            }
            console.log(event);
            io.emit('event', event);
            console.log('emmited')
        })
        
    });
})





