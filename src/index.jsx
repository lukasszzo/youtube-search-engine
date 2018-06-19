import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search-bar';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail.jsx';
const ApiKey = 'AIzaSyAqxyVRbUTmGH_kLl01t4kZ-B85lkAGETc';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        }
        this.videoSearch('reactjs')
    };

    videoSearch(term) {
        YTSearch({key: ApiKey,term: term}, (videos) => {this.setState({videos: videos, selectedVideo: videos[0]});

    });

}

render() {
    const videoSearch= _.debounce((term)=>{this.videoSearch(term)},300);
    return (<div>
        <SearchBar onSearchTermChange={videoSearch}/>
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList onVideoSelect={selectedVideo => this.setState({selectedVideo})} videos={this.state.videos}/>
    </div>);
}
}

ReactDOM.render(<App/>, document.querySelector('.container'));
