import http from 'k6/http';
import { sleep, check } from 'k6';

// export default function() {
//   http.get('http://test.k6.io');
//   sleep(1);
// }

export default function() {
  var arr = [];
  for (var id = 1000; id < 10000000; id++) {
    let req = {
      method: 'GET',
      url: `http://localhost:3001/?id=${id}`,
    };
    arr.push(req);
  }



  let responses = http.batch(arr);
  // httpbin.org should return our POST data in the response body, so
  // we check the third response object to see that the POST worked.
  console.log(JSON.parse(responses[0].body).id);
  // check(responses[2], {
  //   'form data OK': res => JSON.parse(res.body)['form']['hello'] === 'world!',
  // });
}