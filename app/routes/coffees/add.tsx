import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useNavigate, useTransition } from "@remix-run/react";
import { motion } from "framer-motion";

import { Datalist, Fieldset, Input } from "atoms";

import { addCoffee } from "models";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  await addCoffee(formData);
  return redirect(`/coffees`);
};

export default function AddCoffee() {
  const navigate = useNavigate();
  const transition = useTransition();

  const disabled = transition.state === "submitting" || transition.state === "loading";

  return (
    <motion.div
      initial={{ x: "100%" }}
      exit={{ x: "100%" }}
      animate={{ x: 0 }}
      className="p-10 flex flex-col gap-5 fixed right-0 top-0 w-full h-screen max-w-md shadow-2xl bg-slate-200 overflow-scroll"
    >
      {transition.state === "submitting" ? <div>Saving...</div> : null}

      <Form method="post" action="/coffees/add" replace className="flex flex-col gap-4">
        <Fieldset disabled={transition.state === "submitting"}>
          <Input type="text" label="Shop Name" placeholder="Some Shop Name" name="title" />
          <Input type="text" label="Website URL" placeholder="https://someshopname.com" name="url" />
          <Input type="email" label="Email address" placeholder="sales@someshopname.com" name="email" />
          <Input type="telephone" label="Phone number" placeholder="021 345 6789" name="phone" />
          <Input type="text" label="Primary City" placeholder="Cape Town" name="city" />
          <Datalist
            options={[
              { label: "Eastern Cape", value: "Eastern Cape" },
              { label: "Free State", value: "Free State" },
              { label: "Gauteng", value: "Gauteng" },
              { label: "KwaZulu-Natal", value: "KwaZulu-Natal" },
              { label: "Limpopo", value: "Limpopo" },
              { label: "Mpumalanga", value: "Mpumalanga" },
              { label: "Northern Cape", value: "Northern Cape" },
              { label: "North West", value: "North West" },
              { label: "Western Cape", value: "Western Cape" }
            ]}
            label="Province"
            placeholder="Western Cape"
            name="province"
          />
          <Input type="number" label="Avg pricing (per 250g bag)" placeholder="250" name="pricing" />
          <Input type="checkbox" label="Do they offer coffee sundries?" name="hasSundries" />
          {/* <textarea name="bulk"></textarea> */}
        </Fieldset>

        <p className="flex flex-row gap-4 items-center justify-center">
          <button
            className="w-full bg-slate-400 p-3 rounded-md text-white"
            type="button"
            onClick={() => (confirm("Are you sure you want to cancel?") ? navigate("/coffees") : false)}
            disabled={disabled}
          >
            Cancel
          </button>
          <button className="w-full bg-slate-700 p-3 rounded-md text-white" type="submit" disabled={disabled}>
            Create
          </button>
        </p>
      </Form>
    </motion.div>
  );
}
