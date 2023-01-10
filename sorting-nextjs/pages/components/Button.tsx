import { useEffect, useState } from "react";
import styles from "../../styles/Button.module.css";

export default function Button(props: { text: string; onClick: any; disabled: boolean }) {
  return (
    <button
      disabled={props.disabled}
      className={styles.button}
      onClick={props.onClick}>
      <span className={styles.text}>{props.text}</span>
    </button>
  );
}
