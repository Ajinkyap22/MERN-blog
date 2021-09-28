function Preview(props) {
  return (
    <div className="text-center">
      <p className="lead">props.title</p>
      <p>props.author</p>
      <p>props.date</p>

      <button className="btn btn-primary">View Post</button>
    </div>
  );
}

export default Preview;
