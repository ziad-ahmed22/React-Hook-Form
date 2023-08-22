import styles from "./YouTubeForm.module.css";
import { useFieldArray, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

export const YouTubeForm = () => {
  const { youtubeForm, error, dynamicPhones, resetBtn } = styles;
  const form = useForm({
    defaultValues: {
      username: "Ziad Ahmed",
      email: "",
      channel: "",
      social: {
        linkedin: "",
      },
      phoneNumbers: ["", ""],
      dynamicPhoneNumbers: [{ numbe: "" }],
      age: "",
      date: new Date(),
      watchInput: "",
    },
    mode: "onTouched",
    // default => onSubmit, onBlur, onTouched, onChange, all
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
  } = form;

  const {
    errors,
    dirtyFields,
    touchedFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  // console.log(register()); // {name: undefined, onChange: ƒ, onBlur: ƒ, ref: ƒ}
  // console.log(errors); // {username: {…}, email: {…}, channel: {…}}

  // adding dynamic fields
  const { fields, append, remove } = useFieldArray({
    name: "dynamicPhoneNumbers",
    control,
  });

  // watch field
  // const watchVal = watch("watchInput");
  const watchArr = watch(["watchInput"]);

  // get form values
  const getValuesHandler = () => {
    console.log("Form Values", getValues());
    console.log("Form Spacific Values", getValues(["email", "social"]));
  };

  // set input value
  const setValuesHandler = () => {
    setValue("setVal", "I Am A Value", {
      // optional
      shouldValidate: true,
      shouldTouch: true, // touch input
      shouldDirty: true, // change on input
    });
  };

  const formSubmitHandler = (data) => {
    // touchedFields {},  dirtyFields {}, isDirty false
    console.log("touchedFields", touchedFields);
    console.log("dirtyFields", dirtyFields);
    console.log("isDirty", isDirty);
    console.log("isValid", isValid);
    console.log("Form Data", data);
  };

  const formErrorsHandler = (errors) => {
    console.log("Form Errors", errors);
  };

  console.log("isSubmitting", isSubmitting);
  console.log("isSubmitted", isSubmitted);
  console.log("isSubmitSuccessful", isSubmitSuccessful);
  console.log("submitCount", submitCount);

  // reset value
  useEffect(() => {
    isSubmitSuccessful && reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <form
        className={youtubeForm}
        onSubmit={handleSubmit(formSubmitHandler, formErrorsHandler)}
        noValidate
      >
        {/* Div Container For Username */}
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            {...register("username", {
              required: "The Username Is Required",
              // custom validation
              validate: {
                unValidName: (fieldVal) => {
                  return (
                    !(fieldVal.length < 4) ||
                    "The Username Must Be At Least 4 Chars"
                  );
                },
              },
            })}
          />
          <p className={error}>{errors?.username?.message}</p>
        </div>
        {/*  */}

        {/* Div Container For Email */}
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "The Email Is Required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{3}$/,
                message: "The Email Is Not Valid",
              },
              // custom validation
              validate: {
                notBlockListed: (fieldVal) => {
                  return (
                    !fieldVal.endsWith("bad.com") ||
                    "This Domain Isn't Supported"
                  );
                },
                emailAvailable: async (fieldVal) => {
                  const res = await fetch(
                    `https://jsonplaceholder.typicode.com/users?email=${fieldVal}`
                  );
                  const data = await res.json();
                  return data.length === 0 || "Email Is Not Available";
                },
              },
            })}
          />
          <p className={error}>{errors?.email?.message}</p>
        </div>
        {/*  */}

        {/* Div Container For Channel */}
        <div>
          <label htmlFor="channel">Channel</label>
          <input
            type="text"
            id="channel"
            {...register("channel", {
              required: "The Channel Name Is Required",
            })}
          />
          <p className={error}>{errors?.channel?.message}</p>
        </div>
        {/*  */}

        {/* Div Container For Linkedin */}
        <div>
          <label htmlFor="linkedin">Linkedin</label>
          <input type="text" id="linkedin" {...register("social.linkedin")} />
        </div>
        {/*  */}

        {/* Div Container For Phone Numbers */}
        <div>
          <label htmlFor="phoneOne">First Phone Number</label>
          <input type="text" id="phoneOne" {...register("phoneNumbers.0")} />
        </div>
        <div>
          <label htmlFor="phoneTwo">Second Phone Number</label>
          <input type="text" id="phoneTwo" {...register("phoneNumbers.1")} />
        </div>
        {/*  */}

        {/* Div Container For Dynamic Phone Numbers */}
        <div className={dynamicPhones}>
          <label>Dynamic Phone Numbers</label>
          {fields.map((field, idx) => (
            <div key={field.id}>
              <input
                type="text"
                {...register(`dynamicPhoneNumbers.${idx}.number`)}
              />
              {idx > 0 && (
                <button type="button" onClick={() => remove(idx)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          {fields.length < 3 && (
            <button type="button" onClick={() => append({ number: "" })}>
              Add New Number
            </button>
          )}
        </div>
        {/*  */}

        {/* Div Container For Age */}
        <div>
          <label htmlFor="age">Your Age</label>
          <input
            type="number"
            id="age"
            {...register("age", { valueAsNumber: true })}
          />
        </div>
        {/*  */}

        {/* Div Container For Date */}
        <div>
          <label htmlFor="date">Your Date Of Birth</label>
          <input
            type="date"
            id="date"
            {...register("date", { valueAsDate: true })}
          />
        </div>
        {/*  */}

        {/* Div Container For Watched Field */}
        <div>
          <label htmlFor="watch">Write Something To Watch: {watchArr[0]}</label>
          <input type="text" id="watch" {...register("watchInput")} />
        </div>
        {/*  */}

        {/* Button For Git Form Values */}
        <div>
          <button type="button" onClick={getValuesHandler}>
            Get Values
          </button>
        </div>
        {/*  */}

        {/* Div Container For Set Input Value */}
        <div>
          <label htmlFor="setVal">Set Input Value</label>
          <input type="text" id="setVal" {...register("setVal")} />
          <button type="button" onClick={setValuesHandler}>
            Set Value
          </button>
        </div>
        {/*  */}

        {/* Div Container For Disabled Field */}
        <div>
          <label htmlFor="disabledField">Disabled Field:: WatchInput</label>
          <input
            type="text"
            id="disabledField"
            {...register("disabledField", {
              // disabled: true,
              disabled: watch("watchInput") === "",
            })}
          />
        </div>
        {/*  */}

        {/* Submit And Reset Buttons */}
        <button className={resetBtn} onClick={() => reset()}>
          Reset
        </button>
        {/* <button>Submit</button> */}
        <button disabled={!isDirty || !isValid || isSubmitting}>Submit</button>
      </form>

      <DevTool control={control} />
    </div>
  );
};

// ==============================================
// doesn't re render the component
// don't need e.preventDefault();

// ==============================================
// adding default values
// also you I use async fun to get an email from api as a default value
// defaultValues: async()=>{}
