import * as courseService from '../utils/courseService.js';
import * as env from '../../env.js'
import * as testData from '../testdata/testdata.js'

export let options = {
  vus: testData.VUS,
  duration: testData.DURATION,
  teardownTimeout: "20s"
}

let environment;
let token;

if(`${__ENV.ENVIRONMENT}` == env.int){
  environment = env.intEnvironment;
  token = `${__ENV.INT_TOKEN}`;
} else if (`${__ENV.ENVIRONMENT}` == env.dev) {
  environment = env.devEnvironment;
  token = `${__ENV.DEV_TOKEN}`;
}