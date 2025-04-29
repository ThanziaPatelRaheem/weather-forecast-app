import { BeatLoader } from "react-spinners";
export default function Loading() {
  return (
    <>
      <section className="loading-container">
        <BeatLoader
          color="#1b263b"
          size={15}
          loading={true}
          aria-label="Loading..."
        />
        <h3>Loading weather data...</h3>
      </section>
    </>
  );
}
// s
