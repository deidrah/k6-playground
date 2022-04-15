import http from 'k6/http';

export let options = {
  stages: [
    {duration: '10s', target: 5}, //5 virtual users for 10s
    {duration: '20s', target: 25}
  ]
}

export default function() {
  http.get('https://www.google.com');
}