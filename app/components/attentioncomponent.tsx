// components/AttentionComponent.jsx
import styles from './AttentionComponent.module.css'

// Komponen ini bisa menerima children, jadi apa pun bisa diberi animasi
const AttentionComponent = ({ children }) => {
  return (
    <div className={styles.floating}>
      {children}
    </div>
  );
};

export default AttentionComponent;