import { Dispatch, SetStateAction } from "react";

export async function selectionSort(
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
    if (setNumbers) {
      arr[minIndex].state = 2;
    }

    let j = i + 1;
    while (j < arr.length) {
      if (setNumbers) {
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
      } else if (setNumbers) {
        arr[j].state = 0;
      }
      j++; // Missing in pseudo code...
    }
    if (minIndex != i) {
      let swap = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = swap;
    }
    if (setNumbers) {
      arr[i].state = 0;
    }
    i++;
  }
  if (setNumbers) {
    setNumbers([...arr]);
  }
  return arr;
}
