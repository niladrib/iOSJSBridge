var tip_metadata = {
    'thresholds': {
        'bounce': {
            'min': 100,
            'max': 500,
            'priority': 1
        },
        'pelvic_rot_x': {
            'max': 30,
            'priority': 1
        }
    },
    'tips': [
             {
             'id': 1,
             'text': 'Keep your midsection engaged, like someone is going to punch you',
             'triggers': [
                          {
                          'parameter': 'pelvic_rot_x',
                          'threshold': 'max',
                          'priority': 1
                          }
                          ]
             },
             {
             'id': 2,
             'text': 'Evenness - you\'re running one leg at a time',
             'triggers': [
                          {
                          'parameter': 'pelvic_rot_x',
                          'threshold': 'max',
                          'priority': 2
                          },
                          {
                          'parameter': 'bounce',
                          'threshold': 'max',
                          'priority': 1
                          }
                          ]
             }
             ]
};
//MEMBER VARIABLES
var dataPoints = [
];
var avg;
var sample_size = 10;
var sample_avg;
var sample_pts = [
];
//FUNCTIONS
/*
 Reads tip metadata and thresholds and creates lookup tables
 {
 'id': 2,
 'text': 'Evenness - you\'re running one leg at a time',
 'triggers': [
 {
 'parameter': 'pelvic_rot_x',
 'threshold': 'max',
 'priority': 2
 },
 {
 'parameter': 'bounce',
 'threshold': 'max',
 'priority': 1
 }
 ]
 }
 */
var metadata_mgr = function (tip_metadata) {
    var my_metadata= JSON.parse(JSON.stringify(tip_metadata));
    var thresholds;
    var tips = {
        'cadence': {
            'min_tips': [
            ],
            'max_tips': [
            ]
        },
        'bounce': {
            'min_tips': [
            ],
            'max_tips': [
            ]
        },
        'lurch': {
            'min_tips': [
            ],
            'max_tips': [
            ]
        },
        'pelvic_rot_x': {
            'min_tips': [
            ],
            'max_tips': [
            ]
        },
        'pelvic_rot_y': {
            'min_tips': [
            ],
            'max_tips': [
            ]
        },
        'pelvic_rot_z': {
            'min_tips': [
            ],
            'max_tips': [
            ]
        },
        'stride': {
            'min_tips': [
            ],
            'max_tips': [
            ]
        },
        'ground_contact_t': {
            'min_tips': [
            ],
            'max_tips': [
            ]
        }
    };
    thresholds = tip_metadata.thresholds;
    tip_metadata.tips.forEach(function (tip, idx, tip_array) {
                              tip.triggers.forEach(function (trigger, idx, trigger_array) {
                                                   var param = trigger.parameter;
                                                   if (trigger.threshold === 'min') {
                                                   tips[param].min_tips.push({
                                                                             'id': tip.id,
                                                                             'priority': trigger.priority,
                                                                             'text': tip.text
                                                                             });
                                                   }
                                                   else {
                                                   tips[param].max_tips.push({
                                                                             'id': tip.id,
                                                                             'priority': trigger.priority,
                                                                             'text': tip.text
                                                                             });
                                                   }
                                                   });
                              });
    //sort tips
    for (tip_param in tips) {
        if (tips.hasOwnProperty(tip_param) && typeof tip_param !== 'function') {
            var value = tips[tip_param];
            var sort_fn = function (a, b) {
                if (a.priority < b.priority)
                    return - 1;
                else if (a.priority > b.priority)
                    return 1;
                else
                    return 0;
            };
            value.min_tips = value.min_tips.sort(sort_fn);
            value.max_tips = value.max_tips.sort(sort_fn);
        }
    };
    console.log('threshold=' + JSON.stringify(thresholds));
    console.log('tip=' + JSON.stringify(tips));
    return {
    getTipsMatrix: function(){
        return JSON.parse(JSON.stringify(tips));
    },
    getThresholds: function(){
        return JSON.parse(JSON.stringify(thresholds));
    }
    };
}(tip_metadata);


/*
 Helper function to calculate averages
 */

function calcAvg(pts) {
    return pts.reduce(function (avg, currVal, idx, array) {
                      var newAvg = {
                      };
                      newAvg.cadence = (avg.cadence * idx + currVal.cadence) / (idx + 1);
                      newAvg.bounce = (avg.bounce * idx + currVal.bounce) / (idx + 1);
                      newAvg.lurch = (avg.lurch * idx + currVal.lurch) / (idx + 1);
                      newAvg.pelvic_rot_x = (avg.pelvic_rot_x * idx + currVal.pelvic_rot_x) / (idx + 1);
                      newAvg.pelvic_rot_y = (avg.pelvic_rot_y * idx + currVal.pelvic_rot_y) / (idx + 1);
                      newAvg.pelvic_rot_z = (avg.pelvic_rot_z * idx + currVal.pelvic_rot_z) / (idx + 1);
                      newAvg.stride = (avg.stride * idx + currVal.stride) / (idx + 1);
                      newAvg.ground_contact_t = (avg.ground_contact_t * idx
                                                 + currVal.ground_contact_t) / (idx + 1);
                      console.log('avg bouce=' + avg.bounce + ' avg pelvic_rot_x=' + avg.pelvic_rot_x +
                                  ' idx=' + idx);
                      console.log('newAvg bouce=' + newAvg.bounce + ' newAvg pelvic_rot_x=' +
                                  newAvg.pelvic_rot_x);
                      return newAvg;
                      });
}
/*
 Adds a data point and returns tips if there are any.
 */

function addDataPoint(dp) {
    if (!dp.t || !dp.cadence || !dp.bounce || !dp.lurch
        || !dp.pelvic_rot_x || !dp.pelvic_rot_y || !dp.pelvic_rot_z
        || !dp.stride || !dp.ground_contact_t) {
        console.log('bad dp=' + JSON.stringify(dp));
        throw {
            'name': 'BadInput',
            'message': 'datapoint is missing a required field; pt=' + dp
        };
    }
    dataPoints.push(dp);
    sample_pts.push(dp);
    if (sample_pts.size >= sample_size) {
        sample_avg = calcAvg(sample_pts);
        sample_pts = [
        ];
    }
}
//TEST CODE

var test_data = [
                 {
                 't': 1,
                 'cadence': 111.11,
                 'bounce': 222.22,
                 'lurch': 333.33,
                 'pelvic_rot_x': 0,
                 'pelvic_rot_y': 0,
                 'pelvic_rot_z': 0,
                 'stride': 555.55,
                 'ground_contact_t': 666.66
                 },
                 {
                 't': 2,
                 'cadence': 111.11,
                 'bounce': 222.22,
                 'lurch': 333.33,
                 'pelvic_rot_x': 0,
                 'pelvic_rot_y': 0,
                 'pelvic_rot_z': 0,
                 'stride': 555.55,
                 'ground_contact_t': 666.66
                 },
                 {
                 't': 3,
                 'cadence': 111.11,
                 'bounce': 222.22,
                 'lurch': 333.33,
                 'pelvic_rot_x': 0,
                 'pelvic_rot_y': 0,
                 'pelvic_rot_z': 0,
                 'stride': 555.55,
                 'ground_contact_t': 666.66
                 },
                 {
                 't': 4,
                 'cadence': 111.11,
                 'bounce': 222.22,
                 'lurch': 333.33,
                 'pelvic_rot_x': 0,
                 'pelvic_rot_y': 0,
                 'pelvic_rot_z': 0,
                 'stride': 555.55,
                 'ground_contact_t': 666.66
                 },
                 {
                 't': 5,
                 'cadence': 111.11,
                 'bounce': 222.22,
                 'lurch': 333.33,
                 'pelvic_rot_x': 0,
                 'pelvic_rot_y': 0,
                 'pelvic_rot_z': 0,
                 'stride': 555.55,
                 'ground_contact_t': 666.66
                 },
                 {
                 't': 6,
                 'cadence': 111.11,
                 'bounce': 222.22,
                 'lurch': 333.33,
                 'pelvic_rot_x': 0,
                 'pelvic_rot_y': 0,
                 'pelvic_rot_z': 0,
                 'stride': 555.55,
                 'ground_contact_t': 666.66
                 },
                 {
                 't': 7,
                 'cadence': 111.11,
                 'bounce': 222.22,
                 'lurch': 333.33,
                 'pelvic_rot_x': 0,
                 'pelvic_rot_y': 0,
                 'pelvic_rot_z': 0,
                 'stride': 555.55,
                 'ground_contact_t': 666.66
                 },
                 {
                 't': 8,
                 'cadence': 111.11,
                 'bounce': 222.22,
                 'lurch': 333.33,
                 'pelvic_rot_x': 0,
                 'pelvic_rot_y': 0,
                 'pelvic_rot_z': 0,
                 'stride': 555.55,
                 'ground_contact_t': 666.66
                 },
                 {
                 't': 9,
                 'cadence': 111.11,
                 'bounce': 222.22,
                 'lurch': 333.33,
                 'pelvic_rot_x': 0,
                 'pelvic_rot_y': 0,
                 'pelvic_rot_z': 0,
                 'stride': 555.55,
                 'ground_contact_t': 666.66
                 },
                 {
                 't': 10,
                 'cadence': 111.11,
                 'bounce': 222.22,
                 'lurch': 333.33,
                 'pelvic_rot_x': 10,
                 'pelvic_rot_y': 0,
                 'pelvic_rot_z': 0,
                 'stride': 555.55,
                 'ground_contact_t': 666.66
                 }
                 ];
function test() {
    test_data.forEach(function (element, idx, array) {
                      dataPoints.push(element);
                      });
    var avg = calcAvg(dataPoints);
    console.log('avg bouce=' + avg.bounce + ' avg pelvic_rot_x=' + avg.pelvic_rot_x);
}
test();

