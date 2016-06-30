var React = require('react');
var ReactDOM = require('react-dom');


var Quiz = React.createClass({
  getInitialState: function () {
    return this.props.data.selectGame();
  },
  render: function() {
    return <div>
       <div className="row">
          <div className="col-md-4">
              <img src={this.state.author.imageUrl} className="authorImage col-md-3"></img>
          </div>
          <div className="col-md-7">
              {this.state.books.map(function (b) {
                return <Book title={b} />;
              }, this)}
          </div>
          <div className="col-md-1"></div>
        </div>
     </div>;

  }
});

var Book = React.createClass({

  render: function() {
    return <div><h4>{this.props.title}</h4></div>;
  }
});

var data = [
  {
    name: 'john D',
    imageUrl: "dostoevsky.jpeg",
    books: ['the idiot', 'an ideal husband', 'crime and punishment']
  },
  {
    name: 'bill S',
    imageUrl: "shakespeare.jpeg",
    books: ['the tempest', 'hamlet', 'romeo and juliet']
  }
];

data.selectGame = function () {
  var books = _.shuffle(this.reduce(function(p, c, i) {
    return p.concat(c.books);
  }, [])).slice(0,4);

  var answer = books[_.random(books.length-1)];

  return {
    books: books,
    author: _.find(this, function (author) {
      return author.books.some(function (title) {
          return title === answer;
      });
    })
  };
};

ReactDOM.render(<Quiz data={data} />,
document.getElementById('app'));
