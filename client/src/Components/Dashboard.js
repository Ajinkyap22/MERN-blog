import { useEffect, useState } from "react";
import Preview from "./Preview";

function Dashboard(props) {
  const [showPublished, setShowPublished] = useState(false);
  const [showUnpublished, setShowUnpublished] = useState(false);

  useEffect(() => {
    props.posts.filter(
      (post) => post.author._id === props.user._id && post.published
    ).length
      ? setShowPublished(true)
      : setShowPublished(false);

    props.posts.filter(
      (post) => post.author._id === props.user._id && !post.published
    ).length
      ? setShowUnpublished(true)
      : setShowUnpublished(false);
  }, [props.posts, props.user]);

  return (
    <div>
      <h1>{`${props.user.username}'s Dashboard'`}</h1>

      <section>
        <h2>Published Posts</h2>
        <p hidden={showPublished ? true : false}>
          You have no published posts.
        </p>

        <div className="row w-100" hidden={showPublished ? false : true}>
          {props.posts
            .filter(
              (post) => post.author._id === props.user._id && post.published
            )
            .map((post) => (
              <div className="col" key={post._id}>
                <Preview
                  {...post}
                  publishing={true}
                  setPosts={props.setPosts}
                />
              </div>
            ))}
        </div>
      </section>

      <section>
        <h2>Unpublished Posts</h2>
        <p hidden={showUnpublished ? true : false}>
          You have no unpublished posts.
        </p>

        <div className="row w-100" hidden={showUnpublished ? false : true}>
          {props.posts
            .filter(
              (post) => post.author._id === props.user._id && !post.published
            )
            .map((post) => (
              <div className="col" key={post._id}>
                <Preview
                  {...post}
                  unpublishing={true}
                  setPosts={props.setPosts}
                  posts={props.posts}
                />
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
