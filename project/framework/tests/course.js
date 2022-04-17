import * as courseService from '../utils/courseService.js';
import * as env from '../../env.js'
import * as testData from '../testdata/testdata.js'
import { setup } from '../../../tests/11-script.js';

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

export function setup() {
 // no setup required
}

export default function() {
  try {
    let responseBody = courseService.createCourse(`${environment.SERVER_ENDPOINT}`, token);
    courseService.getCourse(environment.SERVER_ENDPOINT, token, responseBody[0].id);
    courseService.deleteCourse(environment.SERVER_ENDPOINT, token, responseBody[0].id);
  
  }
  catch (ex) {
    console.log(`error occurs in execution`)
  }
}