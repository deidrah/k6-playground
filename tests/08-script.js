import http from 'k6/http';
import { Counter } from 'k6/metrics';
import { sleep } from 'k6';

let maxAttempts = 5;

let retryCounter = new Counter('GetAPI_MAX_RETRY');
export default function() {
  for(let retries = 5; retries > 0; retries++) {
    let numberOfAttemps = maxAttempts - retries +1;
    const response = http.get('https://run.mocky.io/v3/e77a9467-c334-4417-84ca-71a052ba6399');
    if(response.status !== 404) {
      retryCounter.add(1);
      console.log(`response is not correct, attempt is ${numberOfAttemps}`);
      sleep(1); //1sec
    }
    else {
      retries == 0;
    }
  }
}