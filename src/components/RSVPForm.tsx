import React, { useEffect, useState } from "react";
import { FilterSearch } from "@yext/search-ui-react";
import { useSearchActions } from "@yext/search-headless-react";
import { useForm } from "react-hook-form";
import { weddingGuestAPIResponseSchema, WeddingGuest } from "../types/site";
import { ImSpinner2 } from "react-icons/im";
import { z } from "zod";

const getPersonByName = async (name: string): Promise<WeddingGuest> => {
  const url = "https://liveapi.yext.com/v2/accounts/me/entities?";
  const filter = {
    "name": {
      "$eq": name
    }
  };
  const params = {
    "filter": JSON.stringify(filter),
    "api_key": "e5752463b6278ab2218622a356ab15f7",
    "v": "20220101",
    "locale": "en",
  };
  const stringParams = new URLSearchParams(params).toString();
  const res = await fetch(url + stringParams, {});
  const data = await res.json();
  const parsedData = weddingGuestAPIResponseSchema.parse(data);
  if (parsedData.response.count === 1) {
    const guest = parsedData.response.entities[0];
    return guest;
  } else {
    throw new Error("No person found with that name");
  }
};

const RSVPForm = () => {


  const [selectedGuest, setSelectedGuest] = useState<WeddingGuest | undefined>(undefined);
  // This is for loading the person's data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // This is for submitting the form
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: selectedGuest?.c_guestEmail,
      phone: selectedGuest?.mainPhoneNumber,
      note: undefined,
      attending: true,
    }
  });

  const formSchema = z.object({
    email: z.string().email(),
    phone: z.string(),
    attending: z.coerce.boolean(),
    note: z.string().optional(),
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    const parsedData = formSchema.parse(data);
    console.log(parsedData);
    // 2 second timeout
    await setTimeout(() => {
      setSubmitting(true);
    }, 2000);
    setSubmitting(false);
    setSubmitted(true);
    window.alert("RSVP submitted! Thank you for your response. :)");
    // window.alert("RSVP submitted! Thank you for your response. :)");
  };

  const searchActions = useSearchActions();
  useEffect(() => {
    searchActions.setVertical("wedding_guests");
  }, []);

  return (
    <div className="mt-28 flex flex-col justify-center items-center h-full">
      <div className="h-full">
        <h1 className="text-4xl font-bold text-center font-lobsterTwo text-green-1100">
          RSVP
        </h1>
        <p className="text-center text-green-1100">
          Enter your name to RSVP.
        </p>
        <div className="my-4">
          <FilterSearch
            placeholder="Search for your name..."
            customCssClasses={{
              filterSearchContainer: "w-96 my-0 shadow-sm",
              inputElement: "px-3 py-3",
            }}
            sectioned={false}
            searchFields={[
              {
                entityType: "ce_weddingGuest",
                fieldApiName: "name",
              }
            ]}
            onSelect={({ newDisplayName, setCurrentFilter, newFilter }) => {
              setLoading(true);
              setCurrentFilter(newFilter);
              console.log(newDisplayName, newFilter)
              getPersonByName(newDisplayName)
                .then((guest) => {
                  console.log({ guest })
                  setSelectedGuest(guest);
                  setLoading(false);
                  setError(false);
                })
                .catch((err) => {
                  console.error(err);
                  setError(true);
                  setLoading(false);
                })
            }}
          />
        </div>
        <div>
          {
            loading &&
            <div className="flex flex-col items-center justify-center">
              <ImSpinner2 className="animate-spin text-2xl text-green-1100" />
            </div>
          }
          {
            error &&
            <p className="text-center  text-green-1100">
              Sorry, something went wrong. Please try again.
            </p>
          }
          {
            (!loading && selectedGuest) &&
            <div>
              <div className="my-6">
                {/* There is a horizontal line on either side of the paragraph */}
                <div className="flex flex-row justify-center items-center gap-x-4">
                  <div className="w-1/5 h-[2px] bg-green-1100"></div>
                  <p className="text-center text-xl font-bold text-green-1100 font-lobsterTwo">
                    Welcome {selectedGuest.name}!
                  </p>
                  <div className="w-1/5 h-[2px] bg-green-1100"></div>
                </div>
                <p className="text-sm text-green-1100 text-center">
                  Please confirm your information below.
                </p>
              </div>
              <form
                className="flex flex-col justify-center items-center gap-y-4"
                onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full">
                  <label htmlFor="email" className="w-full text-left block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("email", { required: true })}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-0 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label htmlFor="email" className="w-full text-left block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <div className="mt-1">
                    <input
                      {...register("phone", { required: true, })}
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="1234567890"
                      required
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-0 sm:text-sm"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label htmlFor="email" className="w-full text-left block text-sm font-medium text-gray-700">
                    Note
                  </label>
                  <div className="mt-1">
                    <textarea
                      {...register("note")}
                      id="note"
                      name="note"
                      placeholder="Any special requests?"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-0 sm:text-sm"
                    />
                  </div>
                </div>
                {/* Some nice radio buttons for attending vs not attending */}
                <div className="w-full">
                  <fieldset>
                    <legend className="text-sm font-medium text-gray-900">Will you be attending?</legend>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <input
                          {...register("attending")}
                          required
                          id="attending"
                          name="attending"
                          type="radio"
                          value="true"
                          className="focus:ring-green-1100/50 h-4 w-4 text-green-1100 border-gray-300"
                        />
                        <label htmlFor="attending" className="ml-3 block text-sm font-medium text-gray-700">
                          Yes
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          {...register("attending")}
                          required
                          id="not-attending"
                          name="attending"
                          type="radio"
                          value="false"
                          className="focus:ring-green-1100/50 h-4 w-4 text-green-1100 border-gray-300"
                        />
                        <label htmlFor="not-attending" className="ml-3 block text-sm font-medium text-gray-700">
                          No
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
                <button
                  disabled={submitting || submitted}
                  type="submit"
                  className="flex w-full justify-center rounded-md border border-transparent bg-green-1000 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-green-1100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                  {
                    submitting && <ImSpinner2 className="animate-spin text-2xl text-white/70" />
                  }
                  {
                    (!submitting && !submitted) && "Submit"
                  }
                  {
                    submitted && "Submitted!"
                  }
                </button>
              </form>
            </div>
          }
        </div>
      </div >
    </div >
  )
}

export default RSVPForm;