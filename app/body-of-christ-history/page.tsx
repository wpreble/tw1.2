"use client"
import { Timeline, type TimelineEntry } from "@/components/ui/timeline" // Corrected import path
import { Button } from "@/components/ui/button"
import { Video, BookIcon, LinkIcon } from "lucide-react" // Renamed BookOpen to BookIcon to avoid conflict

const churchHistoryData: TimelineEntry[] = [
  {
    title: "c. 30-33 AD: The Crucifixion & Resurrection of Jesus Christ",
    content: (
      <div className="space-y-2">
        <p className="text-sm">
          The foundational events of Christianity. Jesus' death and resurrection, fulfilling Old Testament prophecies
          and establishing the New Covenant.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="border-greyBlue text-greyBlue hover:bg-greyBlue hover:text-pureWhite"
        >
          <BookIcon size={14} className="mr-2" /> Study Key Passages
        </Button>
      </div>
    ),
  },
  {
    title: "c. 33 AD: Pentecost",
    content: (
      <div className="space-y-2">
        <p className="text-sm">
          The Holy Spirit descends upon the Apostles and other followers of Jesus Christ, empowering them to preach the
          Gospel. Often considered the "birthday" of the Church.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="border-greyBlue text-greyBlue hover:bg-greyBlue hover:text-pureWhite"
        >
          <Video size={14} className="mr-2" /> Watch: The Day of Pentecost
        </Button>
      </div>
    ),
  },
  {
    title: "c. 46-67 AD: Missionary Journeys of Paul",
    content: (
      <div className="space-y-2">
        <p className="text-sm">
          Apostle Paul undertakes several extensive missionary journeys, spreading Christianity throughout Asia Minor,
          Greece, and Rome, establishing numerous churches.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="border-greyBlue text-greyBlue hover:bg-greyBlue hover:text-pureWhite"
        >
          <LinkIcon size={14} className="mr-2" /> Explore Paul's Letters
        </Button>
      </div>
    ),
  },
  {
    title: "AD 70: Destruction of the Second Temple in Jerusalem",
    content: (
      <div className="space-y-2">
        <p className="text-sm">
          The Roman army destroys the Temple, a pivotal event that significantly impacted Judaism and early
          Christianity, leading to a further separation between the two faiths.
        </p>
      </div>
    ),
  },
  {
    title: "c. 313 AD: Edict of Milan",
    content: (
      <div className="space-y-2">
        <p className="text-sm">
          Emperors Constantine and Licinius issue the Edict of Milan, granting religious tolerance to Christians within
          the Roman Empire, effectively ending widespread persecution.
        </p>
      </div>
    ),
  },
  {
    title: "AD 325: First Council of Nicaea",
    content: (
      <div className="space-y-2">
        <p className="text-sm">
          Convened by Emperor Constantine, this ecumenical council addressed Arianism and formulated the Nicene Creed, a
          foundational statement of Christian belief.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="border-greyBlue text-greyBlue hover:bg-greyBlue hover:text-pureWhite"
        >
          <BookIcon size={14} className="mr-2" /> Read about the Nicene Creed
        </Button>
      </div>
    ),
  },
  {
    title: "AD 1054: The Great Schism",
    content: (
      <div className="space-y-2">
        <p className="text-sm">
          The formal split between the Eastern (Orthodox) and Western (Roman Catholic) Churches, stemming from
          theological, political, and cultural differences that had developed over centuries.
        </p>
      </div>
    ),
  },
  {
    title: "1517: Martin Luther Posts the 95 Theses",
    content: (
      <div className="space-y-2">
        <p className="text-sm">
          Martin Luther's challenge to the practice of selling indulgences sparks the Protestant Reformation, leading to
          a major division within Western Christianity.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="border-greyBlue text-greyBlue hover:bg-greyBlue hover:text-pureWhite"
        >
          <LinkIcon size={14} className="mr-2" /> Learn about the Reformation
        </Button>
      </div>
    ),
  },
  {
    title: "c. 1730s-1740s: The First Great Awakening",
    content: (
      <div className="space-y-2">
        <p className="text-sm">
          A series of Christian revivals that swept through Britain and its North American colonies, emphasizing
          personal conversion and piety. Figures like Jonathan Edwards and George Whitefield were prominent.
        </p>
      </div>
    ),
  },
  {
    title: "1906: Azusa Street Revival",
    content: (
      <div className="space-y-2">
        <p className="text-sm">
          A historic series of revival meetings in Los Angeles that marked the beginning of the modern Pentecostal
          movement, characterized by spiritual gifts such as speaking in tongues and divine healing.
        </p>
        <Button
          variant="outline"
          size="sm"
          className="border-greyBlue text-greyBlue hover:bg-greyBlue hover:text-pureWhite"
        >
          <Video size={14} className="mr-2" /> Watch: The Azusa Street Story
        </Button>
      </div>
    ),
  },
  {
    title: "1962-1965: Second Vatican Council (Vatican II)",
    content: (
      <div className="space-y-2">
        <p className="text-sm">
          A landmark council of the Catholic Church that introduced significant reforms and addressed the Church's
          relationship with the modern world.
        </p>
      </div>
    ),
  },
  {
    title: "Present Day: Global Christianity & The Digital Age",
    content: (
      <div className="space-y-2">
        <p className="text-sm">
          Christianity continues to be a diverse global faith, with significant growth in the Global South. The digital
          age presents new opportunities and challenges for evangelism, discipleship, and community.
        </p>
      </div>
    ),
  },
]

export default function BodyOfChristHistoryPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      {" "}
      {/* Use theme variables */}
      <header className="py-10 px-4 md:px-8 lg:px-10 text-center">
        <h1 className="text-3xl md:text-5xl font-serif mb-3">Body of Christ History</h1>
        <p className="text-muted-foreground text-md md:text-lg max-w-2xl mx-auto">
          {" "}
          {/* Use theme variable */}
          Explore the rich tapestry of Church history, from its foundations to the present day. Understand the
          movements, figures, and theological developments that have shaped the global Body of Christ.
        </p>
      </header>
      <Timeline data={churchHistoryData} /> {/* Timeline component itself was updated to use theme variables */}
    </div>
  )
}
