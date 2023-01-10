import { useEffect, useState } from "react";
import styles from "../styles/Screen.module.css";
import { carlSpeciale } from "../algorithms/carlSpeciale";
import { insertionSort } from "../algorithms/insertion";
import { mergeSort } from "../algorithms/merge";
import { selectionSort } from "../algorithms/selection";
import Button from "./components/Button";

export default function Screen() {
  const [numbers, setNumbers] = useState<{ val: number; state: number }[]>([]);
  const [sleepTime, setSleepTime] = useState(100);
  const [length, setLength] = useState(0);
  const [windowWidth, setWindowWidth] = useState(0);
  const [time, setTime] = useState(0);
  const [algo, setAlgo] = useState("insertion");
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    createArray();
  }, [length]);

  const createArray = () => {
    let array = [];
    // Add staples to array:
    for (let i = 1; i <= length; i++) {
      array.push({ val: i, state: 0 });
    }
    array.sort(() => Math.random() - 0.5); // Randomize array

    setNumbers(array);
  };

  const sort = async () => {
    setRunning(true);
    let now = Date.now();
    const updateTime = () => {
      setTime(Date.now() - now);
    };
    updateTime();
    let interval = setInterval(updateTime, 10);

    if (algo === "insertion") {
      await insertionSort(numbers, sleepTime, setNumbers);
    } else if (algo === "selection") {
      await selectionSort(numbers, sleepTime, setNumbers);
    } else if (algo === "merge") {
      setNumbers(await mergeSort(numbers));
    } else if ("carlSpeciale") {
      await carlSpeciale(numbers, sleepTime, setNumbers);
    }

    clearInterval(interval);
    setRunning(false);
  };

  const handleLength = (newLength: number) => {
    // Update length no greater than screen width, since theres no point in having staples that are less than 1px
    if (isNaN(newLength)) {
      setLength(0);
    } else if (newLength < windowWidth - 4) {
      setLength(newLength);
    } else {
      setLength(windowWidth - 4);
    }
  };

  const getColor = (state: number) => {
    // Set fun colors to stuff!
    switch (state) {
      case 0:
        return "linear-gradient(90deg, rgba(0,7,17,1) 0%, rgba(0,125,154,1) 0%, rgba(0,50,154,1) 100%, rgba(0,7,17,1) 100%)";
      case 1:
        return "linear-gradient(145deg, rgba(2,17,0,1) 0%, rgba(3,154,0,1) 50%, rgba(2,17,0,1) 100%)";
      case 2:
        return "linear-gradient(145deg, rgba(41,0,0,1) 0%, rgba(179,0,0,1) 50%, rgba(41,0,0,1) 100%)";
      case 3:
        return "linear-gradient(145deg, rgba(45,0,48,1) 0%, rgba(154,0,147,1) 23%, rgba(154,0,147,1) 77%, rgba(45,0,48,1) 100%)";
    }
  };

  return (
    <div className={styles.container}>
      <ul className={styles.screen}>
        {numbers.map((obj: { val: number; state: number }, index: number) => (
          <li
            key={index}
            className={styles.staple}
            style={{ backgroundImage: getColor(obj.state), height: `${(obj.val * 100) / length}%` }}
          />
        ))}
      </ul>
      <div style={{ display: "flex", columnGap: "10px" }}>
        <Button
          disabled={running}
          text={"Run"}
          onClick={sort}
        />
        <Button
          disabled={running}
          text={"Shuffle"}
          onClick={createArray}
        />
      </div>
      <div className={styles.buttonsDIV}>
        <label className={styles.selectLabel}>
          <b>Algorithm:</b>
          <select
            disabled={running}
            className={styles.select}
            value={algo}
            onChange={(val) => setAlgo(val.target.value)}>
            <option value="insertion">Insertion</option>
            <option value="selection">Selection</option>
            <option value="merge">Merge</option>
            <option value="carlSpeciale">Carl Specialé</option>
          </select>
        </label>

        <input
          disabled={running}
          value={length}
          onChange={(val) => handleLength(parseInt(val.target.value))}
          className={styles.input}
          type="number"
          placeholder="Array size..."
        />
        <input
          disabled={running}
          value={sleepTime}
          onChange={(val) => setSleepTime(isNaN(parseInt(val.target.value)) ? 0 : parseInt(val.target.value))}
          className={styles.input}
          type="number"
          placeholder="Sleep time in ms..."
        />
      </div>
      <p style={{ alignSelf: "center", fontSize: "1.4rem" }}>
        <b style={{ fontSize: "inherit" }}>Time: </b>
        {time}ms
      </p>
      <ul style={{ alignSelf: "center", fontSize: "1.4rem" }}>
        <li>
          <b style={{ fontSize: "inherit" }}>Explaination: </b>
        </li>
        <li>Blue: Standard </li>
        <li>Green: Comparing to the green staple</li> <li> Red: Active value (In Carl Specialé and Selection it's representing lowest value)</li> <li> Pink: Highest value in Carl Specialé</li>
      </ul>
    </div>
  );
}
