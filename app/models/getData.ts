import { json } from "@remix-run/node";

import { db } from "utils";

export async function getData(collection: string) {
  const querySnapshot = await db.collection(collection).get();

  const data: {}[] = [];
  querySnapshot.forEach(doc => {
    data.push({ ...doc.data(), id: doc.id });
  });

  // @ts-ignore
  data.sort(function (a: { title: string }, b: { title: string }) {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });

  return json(data, { status: 200, headers: { "cache-control": "max-age=300" } });
}
