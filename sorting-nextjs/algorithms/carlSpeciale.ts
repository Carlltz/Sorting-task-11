import { Dispatch, SetStateAction } from "react";

export async function carlSpeciale(
  arr: { val: number; state: number }[],
  sleepTime: number,
  setNumbers:
    | Dispatch<
        SetStateAction<
          {
            val: number;
            state: number;
          }[]
        >
      >
    | undefined
) {
  const sleep = () => {
    return new Promise((r) => {
      setTimeout(r, sleepTime);
    });
  };

  let i = 0;
  while (i < arr.length - 1) {
    let minIndex = i;
    let maxIndex = arr.length - 1 - i;
    if (setNumbers) {
      arr[minIndex].state = 2;
      arr[maxIndex].state = 3;
    }

    let j = i;
    while (j < arr.length - i) {
      if (setNumbers) {
        arr[minIndex].state = 2;
        arr[maxIndex].state = 3;
        arr[j].state = 1;
        setNumbers([...arr]);
      }
      if (sleepTime) await sleep();
      if (arr[j].val < arr[minIndex].val) {
        if (setNumbers) {
          arr[minIndex].state = 0;
          arr[j].state = 2;
          setNumbers([...arr]);
        }

        minIndex = j;
      } else if (arr[j].val > arr[maxIndex].val) {
        if (setNumbers) {
          arr[maxIndex].state = 0;
          arr[j].state = 3;
          setNumbers([...arr]);
        }

        maxIndex = j;
      } else if (setNumbers) {
        arr[j].state = 0;
      }
      j++;
    }
    if (maxIndex === i) {
      maxIndex = minIndex;
    }
    if (minIndex !== i) {
      let swap = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = swap;
    }
    if (maxIndex !== arr.length - 1 - i) {
      let swap = arr[arr.length - 1 - i];
      arr[arr.length - 1 - i] = arr[maxIndex];
      arr[maxIndex] = swap;
    }
    if (setNumbers) {
      arr[i].state = 0;
      arr[arr.length - 1 - i].state = 0;
      setNumbers([...arr]);
    }
    i++;
  }
  if (setNumbers) {
    setNumbers([...arr]);
  }
  return arr;
}
