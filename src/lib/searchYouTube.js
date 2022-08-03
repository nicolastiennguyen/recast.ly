import { API_KEY, YOUTUBE_API_KEY } from '../config/config.js';

$.ajaxPrefilter(function (settings, _, jqXHR) {
  jqXHR.setRequestHeader('Authorization', API_KEY);
});

var searchYouTube = ({key, query, max = 5}, callback) => {
  $.get('https://app-hrsei-api.herokuapp.com/api/recastly/videos', {
    part: 'snippet',
    key: key,
    q: query,
    maxResults: max,
    type: 'video',
    videoEmbeddable: 'true'
  })
  .done((items) => {
    if (callback) {
      callback(items);
    }
  })
  .fail(({responseJSON}) => {
    responseJSON.error.errors.forEach((err) => console.log(err));
  });
};

window.searchYouTube = searchYouTube;

export default searchYouTube;
