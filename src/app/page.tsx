import Calendar from "@/components/calendar/Calendar";
import MaxWidthWrapper from "@/wrappers/MaxWidthWrapper";

const Home = async () => {
  return (
    <section>
      <MaxWidthWrapper>
        <div className="p-4 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Your calendar for important{" "}
            <span className="text-primary">tasks</span>
          </h1>
          <p className="mt-2 font-light">
            Add tasks to your calendar, edit, delete, and track their progress
          </p>
        </div>
        <Calendar />
      </MaxWidthWrapper>
    </section>
  );
};

export default Home;
