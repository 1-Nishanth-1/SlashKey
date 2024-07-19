const Response = () => {
    return (
        <div className="flex w-screen h-screen justify-center items-center bg-popup-color">
            <div className="bg-white p-10 z-50 rounded-md">
                <label htmlFor="" className="text-black text-lg font-semibold">Response for Calamity</label>
                <input
            type="text"
            placeholder="Response"
            class="mt-5 w-full p-2 border border-gray-300 rounded-md placeholder:font-light placeholder:text-gray-500"
            name="name"
            id="name"
          />
          <button className="text-lg font-semibold bg-black py-1.5 px-4 rounded-md mt-5 text-white">Submit</button>
            </div>
        </div>
    )
}   
export default Response;