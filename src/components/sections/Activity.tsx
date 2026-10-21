import { getContributions } from "@/lib/github";
import { site } from "@/lib/site";
import { ContributionCalendar } from "./ContributionCalendar";

export async function Activity() {
  const data = await getContributions();
  const profile = (
    <a href={site.github.url} target="_blank" rel="noopener noreferrer" className="link">
      GitHub profile
    </a>
  );

  return (
    <section id="activity" aria-labelledby="activity-title" className="page py-24 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <h2 id="activity-title" className="section-title">
          Commit activity
        </h2>
        {data && profile}
      </div>

      {data ? (
        <>
          <p className="lead mt-6 max-w-[60ch]">
            {data.total.toLocaleString("en-US")} contributions on GitHub in the last year, with a
            longest streak of {data.longestStreak} {data.longestStreak === 1 ? "day" : "days"}.
          </p>
          <ContributionCalendar days={data.days} />
        </>
      ) : (
        <p className="lead mt-6">GitHub activity couldn’t load right now. You can see it on my {profile}.</p>
      )}
    </section>
  );
}
