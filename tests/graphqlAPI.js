import http from 'k6/http';
import { check, sleep } from 'k6';
import { textSummary } from 'https://jslib.k6.io/k6-summary/0.0.1/index.js';

const BASE_URL = 'https://graphql.lottiefiles.com';

export const options = {
    stages: [
      { duration: '10s', target: 1 },
      { duration: '10s', target: 2 },
    ]
  };

  export default function () {
    const query = `
    {
    featuredToday{ 
      name
      id
     }
    }`;
     let res = http.post(
         BASE_URL,
         JSON.stringify({ query: query}),
         { headers:{"Content-Type": "application/json"}}
     );
    check(res, { 
        'status was 200': (r) => r.status == 200,
        'test validation': (r) => r.body.includes("name")
     });
    sleep(1);
  }
  export function handleSummary(data) {
    console.log('Finished executing performance tests');
  
    return {
      'stdout': textSummary(data, { indent: ' ', enableColors: true }), // Show the text summary to stdout...
      'summary.json': JSON.stringify(data), // and a JSON with all the details...
    };
  }
