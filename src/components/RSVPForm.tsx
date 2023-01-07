import React, { useEffect, useState } from "react";
import { FilterSearch } from "@yext/search-ui-react";
import { useSearchActions } from "@yext/search-headless-react";
import { useForm } from "react-hook-form";
import { weddingGuestAPIResponseSchema, WeddingGuest, Itinerary } from "../types/site";
import { ImSpinner2 } from "react-icons/im";
import { z } from "zod";
import EventLink from "./EventLink";
import Button from "./Button";
import Modal from "./Modal";
import Header from "./Header";
import P from "./P";

const PHONE_REGEX = /^1?\d{10}$/

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

const formSchema = z.object({
  guestId: z.string(),
  email: z.string().email(),
  phone: z.string().regex(PHONE_REGEX),
  note: z.string().optional(),
  "attending-0": z.coerce.number().min(0).max(2), // Welcome Drinks
  "attending-1": z.coerce.number().min(0).max(2), // Rehearsal Dinner
  "attending-2": z.coerce.number().min(0).max(2), // Wedding
});

type FormData = z.infer<typeof formSchema>;

const RSVPForm = (props: { itinerary: Itinerary }) => {
  const { itinerary } = props;
  const [selectedGuest, setSelectedGuest] = useState<WeddingGuest | undefined>(undefined);
  // This is for loading the person's data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // This is for submitting the form
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { register, handleSubmit } = useForm();

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSubmit = async (data: any) => {
    setSubmitting(true);

    let parsedData: FormData;
    if (!selectedGuest) {
      window.alert("Whoops something went wrong. Please try again.");
      setSubmitted(false);
      return;
    }
    try {
      parsedData = formSchema.parse({ ...data, guestId: selectedGuest.meta.id });
    } catch (e) {
      console.error(e);
      window.alert("Whoops something went wrong. Please try again.");
      setSubmitted(false);
      return;
    }
    console.log(parsedData);

    setTimeout(async () => {
      setSubmitting(false);
      const res = await fetch("https://www.thedavishes.com/api/rsvp", {
        method: "POST",
        body: JSON.stringify(parsedData),
      });
      if (res.status !== 200) {
        window.alert("Whoops something went wrong. Please try again.)");
        setSubmitting(false);
        return;
      }
      const data = await res.json();
      console.log({ res, data });
      setSubmitted(true);
      // window.alert("RSVP submitted! Thank you for your response.)");
      setShowSuccessModal(true);
    }, 1000);

  };

  const searchActions = useSearchActions();
  useEffect(() => {
    searchActions.setVertical("wedding_guests");
  }, []);

  return (
    <>
      <Modal isOpen={showSuccessModal}>
        <Header className="text-center">
          Thank You
        </Header>
        <P className="text-center">
          Thanks for your response. We can&apos;t wait to celebrate with you in Lisbon.
          You should receive an email confirmation shortly.
        </P>
        <div className="my-4 flex flex-row">
          <Button
            className="mx-auto w-2/3"
            href="/"
          >
            Got it!
          </Button>
        </div>
      </Modal>
      <div className="overflow-auto flex flex-col justify-center items-center h-full">
        <div className="mt-12 mb-20 h-full w-11/12 lg:w-1/2 max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-center font-lobsterTwo text-green-1100">
            RSVP
          </h1>
          <p className="text-center text-green-1100">
            Enter your name to RSVP.
          </p>
          {(!selectedGuest) && <div className="my-4">
            <FilterSearch
              placeholder="Search for your name..."
              customCssClasses={{
                filterSearchContainer: "w-full mx-auto my-0 shadow-sm",
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
          </div>}
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
                <div className="mt-4 mb-1.5">
                  {/* There is a horizontal line on either side of the paragraph */}
                  <div className="flex flex-row justify-center items-center gap-x-4">
                    <div className="w-full h-[1.5px] bg-green-1100/30"></div>
                    <p className="whitespace-nowrap shrink-0 mx-auto text-center text-xl font-bold text-green-1100 font-lobsterTwo">
                      Welcome {selectedGuest.name}!
                    </p>
                    <div className="w-full h-[1.5px] bg-green-1100/30"></div>
                  </div>
                  <p className="text-sm text-green-1100 text-center">
                    Please confirm your information below.
                  </p>
                </div>
                <form
                  className="flex flex-col justify-center items-center gap-y-3"
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
                        {...register("phone", { required: true, pattern: PHONE_REGEX })}
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
                  {/* Some nice radio buttons for attending vs not attending */}
                  <div className="w-full">
                    {
                      selectedGuest.c_hasPlusOne ?
                        <div className="mx-auto mb-3 w-full3">
                          <p className="font-lobsterTwo text-lg text-center text-green-1100">
                            Looks like you have a plus one!
                          </p>
                          <p className="text-center text-sm  text-green-1100">
                            Please let us know which events you and <span className="font-bold">{selectedGuest.c_plusOneDetails?.firstName} {selectedGuest.c_plusOneDetails?.lastName} </span> will be attending.
                          </p>
                        </div> :
                        <p className="text-sm text-green-1100 text-center">
                          Please let us know which events you will be attending!
                        </p>
                    }
                    <div className="w-full flex flex-col divide-y divide-green-1100/30">
                      {
                        itinerary.map((event, index) => {
                          return (
                            <div className="flex flex-col sm:flex-row py-4" key={index}>
                              <div>
                                <h3 className=" text-sm font-medium text-gray-700">
                                  {event.name}
                                </h3>
                                <EventLink className="text-xs text-gray-700" event={event} />
                              </div>
                              <div className="sm:ml-auto">
                                <select
                                  {...register(`attending-${index}`, { required: true })}
                                  id={`attending-${index}`}
                                  name={`attending-${index}`}
                                  defaultValue={selectedGuest.c_hasPlusOne ? 2 : 1}
                                  autoComplete="attending"
                                  className="block w-full max-w-lg rounded-md border-gray-300 shadow-sm sm:max-w-xs sm:text-sm"
                                >
                                  {selectedGuest.c_hasPlusOne ?
                                    <>
                                      <option value={2}>Both Attending</option>
                                      <option value={1}>Just Me</option>
                                      <option value={0}>Neither Attending</option>
                                    </> :
                                    <>
                                      <option value={1}>Attending</option>
                                      <option value={0}>Not Attending</option>
                                    </>
                                  }
                                </select>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className="w-full">
                      <label htmlFor="note" className="w-full text-left block text-sm font-medium text-gray-700">
                        Note
                      </label>
                      <div className="mt-1">
                        <textarea
                          {...register("note")}
                          id="note"
                          name="note"
                          placeholder="Let us know if you have any dietary restrictions or require special accommodations. "
                          className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-0 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <Button
                    disabled={submitting || submitted}
                    type="submit"
                  >
                    {
                      submitting && <ImSpinner2 className="my-auto animate-spin text-white/70" />
                    }
                    {
                      (!submitting && !submitted) && "Submit"
                    }
                    {
                      submitted && "Submitted!"
                    }
                  </Button>
                </form>
              </div>
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default RSVPForm;