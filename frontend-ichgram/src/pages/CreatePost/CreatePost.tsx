import { useState } from "react";
import styles from "./CreatePost.module.css";
import { addMyPostsApi } from '../../shared/api/posts-api';

const CreatePostPage: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image) return alert("Select Image");

    const formData = new FormData();
    formData.append("photo", image);
    formData.append("text", description);
		console.log("formData in CreatePost",formData);
		
    try {
			const result = await addMyPostsApi(formData)
			setImage(null);
      setPreview(null);
      setDescription("");
      } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Create new Post</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {!preview ? (
          <label className={styles.uploadBox}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
            <span className={styles.uploadText}>
              Click to add image
            </span>
          </label>
        ) : (
          <div className={styles.previewWrapper}>
            <img src={preview} alt="Preview" className={styles.previewImage} />
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => {
                setImage(null);
                setPreview(null);
              }}
            >
              Удалить
            </button>
          </div>
        )}

        <textarea
          className={styles.textarea}
          placeholder="Add description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit" className={styles.submitBtn} disabled={!image}>
          SHARE
        </button>
      </form>
    </div>
  );
};

export default CreatePostPage;
