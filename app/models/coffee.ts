import { db } from "utils";

import type { CoffeeObject, Coords, Provinces } from "../types";

export async function addCoffee(data: FormData) {
  /**
   * If we have a 'bulk' field in our form, this means as admin we are
   * entering rows from spreadsheet in bulk. So split them by row,
   * then split them by tab, and then build an array of promises to
   * send to Firebase
   */
  if (data.get("bulk")) {
    let promises: any = [];

    data
      .get("bulk")
      ?.toString()
      .split("\n")
      .forEach(obj => {
        const item = obj.toString().split("\t") as string[];

        const bulkObj: CoffeeObject = {
          title: item[0],
          url: item[1],
          email: item[2],
          phone: item[3],
          city: item[4],
          province: item[5] as Provinces,
          pricing: Number(item[6]),
          hasSundries: Boolean(item[7] === "Yes"),
          coords: null,
          createdBy: "Markus"
        };

        promises.push(db.collection("coffee").add({ ...bulkObj }));
      });

    await Promise.all(promises);
  } else {
    /**
     * We're adding a single item from the form, so lets add it.
     */
    const formData: CoffeeObject = {
      title: String(data.get("title")).trim(),
      url: String(data.get("url")).trim(),
      email: String(data.get("email")).trim(),
      phone: String(data.get("phone"))?.replace(" ", "").trim(),
      city: String(data.get("city")).trim(),
      province: data.get("province") as Provinces,
      coords: data.get("coords") as unknown as Coords,
      createdBy: String(data.get("createdBy")).trim() || "Markus",

      pricing: Number(data.get("pricing")),
      hasSundries: Boolean(data.get("hasSundries"))
    };

    await db.collection("coffee").add({ ...formData });
  }
}
