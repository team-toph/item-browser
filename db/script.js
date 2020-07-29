import http from 'k6/http';
import { sleep, check } from 'k6';


export default function() {
  var arr = [];
  for (var id = 0; id < 1000000; id++) {
    let req = {
      method: 'GET',
      url: `http://18.221.79.58:3001/?id=${id}`,
    };
    arr.push(req);
  }

  let responses = http.batch(arr);
}