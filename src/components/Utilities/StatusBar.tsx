import { Fragment } from "react";

export default function StatusBar(props: any) {
  return (
    <Fragment>
      <div className="w-full grid grid-cols-12">
        <div className="col-span-7 text-center">Get Ideas</div>
        <div className="col-span-5 text-center">Get Post</div>
      </div>
      <div className="h-[2px] w-full bg-gray-200 my-5 rounded-full grid grid-cols-12">
        <div className="col-span-7 relative">
          <div
            className={`absolute left-[50%] ${
              !props.isPostGenerated ? "bg-primary" : "bg-gray-500"
            } rounded-full h-4 w-4 top-[-7px]`}
          ></div>
        </div>
        <div className="col-span-5 relative">
          <div
            className={`absolute left-[50%] ${
              props.isPostGenerated ? "bg-primary" : "bg-gray-500"
            } rounded-full h-4 w-4 top-[-7px]`}
          ></div>
        </div>
      </div>
    </Fragment>
  );
}
