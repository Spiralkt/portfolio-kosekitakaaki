import Link from "next/link";

export default async function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl dark:text-white">
              大学(院)生のための情報共有サイト、過去問Hub！
            </h1>
            <p className="mb-8 text-xl text-gray-600 md:text-2xl dark:text-gray-300">
              過去問+解答、授業ノート 就活情報にES例、 研究室の口コミ、
              ブログにチャット、大学・研究生活のTipsまで
              便利なサイト集、やっておくと役立つこと.
              毒されたSNS、ショート動画から解放されて、「普通」の同年代のネット民と過ごそう
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-lg bg-blue-600 px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-blue-700">
                ようこそ、過去問Hubへ！
              </button>
              <button className="rounded-lg border-2 border-blue-600 px-8 py-3 font-semibold text-blue-600 transition-colors duration-200 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700">
                Browse Exams
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="container mx-auto bg-white px-4 py-16 dark:bg-gray-800">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            Why Choose Our Platform
          </h2>
          <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <svg
                  className="h-8 w-8 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Vast Exam Library
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access thousands of past exams across all major subjects and
                universities
              </p>
            </div>

            <div className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                <svg
                  className="h-8 w-8 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Verified Answers
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Community-validated solutions ensure accuracy and reliability
              </p>
            </div>

            <div className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
                <svg
                  className="h-8 w-8 text-yellow-600 dark:text-yellow-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Rating System
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Rate and review answers to help others find the best solutions
              </p>
            </div>

            <div className="p-6 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-purple-100 dark:bg-purple-900">
                <svg
                  className="h-8 w-8 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Community Driven
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Learn from peers and contribute to help others succeed
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
            How It Works
          </h2>
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                1
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Search & Browse
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Find exams by subject, university, or course. Filter by rating
                and date.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                2
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Study & Learn
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Review questions and community-verified answers. Save favorites
                for later.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white">
                3
              </div>
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                Share & Rate
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Contribute your own exams and rate answers to help the community
                grow.
              </p>
            </div>
          </div>
        </section>

        {/* Trust & Reliability Section */}
        <section className="container mx-auto bg-blue-50 px-4 py-16 dark:bg-gray-800">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
              Reliable Answers You Can Trust
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600 dark:text-gray-300">
              Our community-driven evaluation system ensures quality and
              accuracy
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-700">
                <h3 className="mb-3 flex items-center text-xl font-semibold text-gray-900 dark:text-white">
                  <svg
                    className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  User Ratings
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every answer can be rated by users. High-rated answers appear
                  first, ensuring you see the most helpful solutions.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-700">
                <h3 className="mb-3 flex items-center text-xl font-semibold text-gray-900 dark:text-white">
                  <svg
                    className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    />
                  </svg>
                  Peer Review
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Students can comment, suggest improvements, and validate
                  answers through collective knowledge.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-700">
                <h3 className="mb-3 flex items-center text-xl font-semibold text-gray-900 dark:text-white">
                  <svg
                    className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                    />
                  </svg>
                  Verified Badge
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Answers with consistently high ratings earn a verified badge,
                  marking them as trusted by the community.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-700">
                <h3 className="mb-3 flex items-center text-xl font-semibold text-gray-900 dark:text-white">
                  <svg
                    className="mr-2 h-6 w-6 text-blue-600 dark:text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Quality Control
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Our algorithm promotes quality content while filtering out
                  low-quality or incorrect submissions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
              Join Our Growing Community
            </h2>
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-blue-600 md:text-5xl dark:text-blue-400">
                  10K+
                </div>
                <div className="font-medium text-gray-600 dark:text-gray-300">
                  Exams Shared
                </div>
              </div>

              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-blue-600 md:text-5xl dark:text-blue-400">
                  50K+
                </div>
                <div className="font-medium text-gray-600 dark:text-gray-300">
                  Active Students
                </div>
              </div>

              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-blue-600 md:text-5xl dark:text-blue-400">
                  200+
                </div>
                <div className="font-medium text-gray-600 dark:text-gray-300">
                  Universities
                </div>
              </div>

              <div className="text-center">
                <div className="mb-2 text-4xl font-bold text-blue-600 md:text-5xl dark:text-blue-400">
                  4.8★
                </div>
                <div className="font-medium text-gray-600 dark:text-gray-300">
                  Average Rating
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="container mx-auto mb-16 px-4 py-16">
          <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-center md:p-12">
            <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
              Ready to Excel in Your Exams?
            </h2>
            <p className="mb-8 text-xl text-blue-100">
              Join thousands of students who are already sharing and learning
              together
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="rounded-lg bg-white px-8 py-3 font-semibold text-blue-600 transition-colors duration-200 hover:bg-blue-50">
                <Link href="/sign-up">Sign Up Now</Link>
              </button>
              <button className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition-colors duration-200 hover:bg-white hover:text-blue-600">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
