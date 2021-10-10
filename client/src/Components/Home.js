import Preview from "./Preview";
import illustration from "../images/illustration.png";

function Home(props) {
  return (
    <main className="pb-3">
      <section className="p-3 d-flex justify-content-center align-items-center bg-white">
        <div>
          <h1 className="display-2 fw-bold">Blogify</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequatur, possimus! Nemo quaerat id illum sint vel praesentium,
            voluptates officia iusto nulla veritatis excepturi earum sapiente
            mollitia architecto. Modi, dolorum aut.
          </p>
        </div>

        <img src={illustration} className="w-50 p-3" alt="Illustration" />
      </section>

      <h4 className="fw-bold p-3">Posts ({props.posts.length})</h4>

      <section className="row row-cols-4 p-3 pt-1 w-100">
        {props.posts.map((post) => (
          <div className="col g-5" key={post._id}>
            <Preview {...post} />
          </div>
        ))}
      </section>
    </main>
  );
}

export default Home;
