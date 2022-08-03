import exampleVideoData from '../data/exampleVideoData.js';
import VideoList from './VideoList.js';
import VideoPlayer from './VideoPlayer.js';
import searchYouTube from '../lib/searchYouTube.js';
import Search from './Search.js';
import Nav from './Nav.js';
// import API_KEY from '../config/config.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videos: exampleVideoData,
      currentVideo: exampleVideoData[0]
    };
  }

  componentDidMount() {
    this.getYouTubeVideos('cute kittens');
  }

  getYouTubeVideos(query) {
    var options = {
      key: this.props.API_KEY,
      query: query
    };

    this.props.searchYouTube(options, (videos) => {
      this.setState({
        videos: videos,
        currentVideo: videos[0]
      });
    });
  }

  onVideoListClick(video) {
    this.setState({
      currentVideo: video
    });
  }

  render () {
    return (
      <div>
        <nav className="navbar">
          <Nav handleSearchInputChange={this.getYouTubeVideos.bind(this)}/>
        <div className="row">
          <div className="col-md-7">
            <VideoPlayer video = {this.state.currentVideo}/>
          </div>
          <div className="col-md-5">
            <VideoList
              videos = {this.state.videos}
              onVideoListClick={this.onVideoListClick.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

{/* // In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined */}
export default App;
