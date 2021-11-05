import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";

function PostForm(props) {
  const [formData, setFormData] = useState({
    title: props.title || "",
    content: props.content || "",
    author: props.user?._id,
    comments: props.comments || [],
    published: props.published || true,
    imgUrl: props.imgUrl || "",
  });

  let headers = {
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
    },
  };

  useEffect(() => {
    document.title = props.editing
      ? "Edit Post | Blogify"
      : "Create Post | Blogify";
  }, [props.editing]);

  const handleSubmit = function (e) {
    e.preventDefault();

    // if not editing create post request
    if (!props.editing) {
      axios
        .post("/api/posts/create", formData, headers)
        .then((res) => {
          props.setPosts((prevState) => [...prevState, res.data]);

          props.setShowToast(true);
          props.setToastText("Post Created Successfully.");

          props.history.push(`/posts/${res.data._id}`);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .put(`/api/posts/${props.id}/edit`, formData, headers)
        .then((res) => {
          props.setPosts((prevState) =>
            prevState.map((post) => (props.id === post._id ? res.data : post))
          );

          props.setEditing(false);

          props.setShowToast(true);
          props.setToastText("Post Edited Successfully.");

          props.history.push(`/posts/${res.data._id}`);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const parseEditorData = (content, editor) => {
    const { targetElm } = editor;
    const { name } = targetElm;

    return {
      target: {
        name,
        value: content,
      },
    };
  };

  const handleChange = function (e) {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const clearForm = (e) => {
    e.preventDefault();
    setFormData({
      title: "",
      content: "",
      imgUrl: "",
    });
  };
  return (
    <div className="mt-5 p-3 w-75 m-auto shadow post-form">
      <h2 className="pt-4 fw-bold">
        {props.editing ? "Edit Blog Post" : "Create Blog Post"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group py-3">
          <label htmlFor="title" className="fw-bold py-2">
            Title <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            placeholder="Title of your blog post"
            onChange={handleChange}
            defaultValue={formData.title || ""}
          />
        </div>

        <div className="form-group py-3">
          <label htmlFor="imgUrl" className="fw-bold py-2">
            Image URL (Optional)
          </label>
          <input
            type="text"
            className="form-control"
            name="imgUrl"
            placeholder="Link of the image you want to insert"
            onChange={handleChange}
            defaultValue={formData.imgUrl || ""}
          />
        </div>

        <div className="form-group py-3">
          <label htmlFor="content" className="fw-bold py-2">
            Content <span className="text-danger">*</span>
          </label>
          <Editor
            apiKey={process.env.REACT_APP_API_KEY}
            init={{
              height: 400,
              menubar: false,
              plugins: [
                "advlist autolink lists link image",
                "charmap print preview anchor help",
                "searchreplace visualblocks code",
                "insertdatetime media table paste wordcount",
              ],
              toolbar:
                // prettier-ignore
                "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help",
            }}
            value={formData.content}
            textareaName="content"
            onEditorChange={(content, editor) => {
              handleChange(parseEditorData(content, editor));
            }}
          ></Editor>
        </div>

        <div className="py-3">
          <button
            type="submit"
            className="btn btn-dark me-2 fw-bold letter-spacing"
            disabled={
              formData.title && formData.content && formData.author
                ? false
                : true
            }
          >
            {props.editing ? "Save" : "Post"}
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary fw-bold mx-2"
            onClick={clearForm}
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(PostForm);
