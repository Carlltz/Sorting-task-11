import { Dispatch, SetStateAction } from "react";

export async function insertionSort(
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

  let i = 1;
  while (i < arr.length) {
    let x = arr[i];
    let j = i - 1;

    if (setNumbers) {
      arr[i].state = 2;
      setNumbers([...arr]);
      arr[j].state = 1;
    }

    while (j >= 0 && arr[j].val > x.val) {
      if (sleepTime) await sleep();
      x = arr[j + 1];

      arr[j + 1] = arr[j];
      arr[j] = x;

      if (setNumbers) {
        arr[j + 1].state = 0;
        arr[j].state = 2;
        j - 1 >= 0 ? (arr[j - 1].state = 1) : null;
        setNumbers([...arr]);
      }
      j--;
    }

    if (setNumbers) {
      arr.map((obj) => {
        obj.state = 0;
        return obj;
      });
      setNumbers([...arr]);
    }
    i++;
  }
  return arr;
}
