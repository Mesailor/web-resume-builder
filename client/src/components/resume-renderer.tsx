import type { Resume } from "@/types/resume";
import { Document, Page, Text, View, Link, PDFViewer } from "@react-pdf/renderer";
import { createTw } from "@react-pdf/tailwind";

// Helvetica is one of react-pdf's built-in fonts, so no registration is needed.
const tw = createTw({
  fontFamily: {
    sans: ["Helvetica"],
  },
});

const SOCIAL_LABELS: Record<keyof Resume["socialNetworks"], string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  telegram: "Telegram",
};

// "https://www.github.com/user/" -> "github.com/user"
const prettifyUrl = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

interface ContactItem {
  label: string;
  href?: string;
}

const getContactItems = (data: Resume): ContactItem[] => {
  const items: ContactItem[] = [];

  if (data.location) items.push({ label: data.location });
  if (data.email) items.push({ label: data.email, href: `mailto:${data.email}` });
  if (data.phone) items.push({ label: data.phone, href: `tel:${data.phone}` });

  return items;
};

const getSocialItems = (data: Resume): ContactItem[] =>
  (Object.keys(SOCIAL_LABELS) as (keyof Resume["socialNetworks"])[])
    .filter((key) => data.socialNetworks[key])
    .map((key) => {
      const url = data.socialNetworks[key]!;
      return { label: `${SOCIAL_LABELS[key]}: ${prettifyUrl(url)}`, href: url };
    });

const InlineList = ({ items }: { items: ContactItem[] }) => {
  if (items.length === 0) return null;

  return (
    <View style={tw("flex-row flex-wrap justify-center mt-1")}>
      {items.map((item, index) => (
        <View key={item.label} style={tw("flex-row")}>
          {index > 0 && <Text style={tw("mx-1.5 text-gray-400")}>•</Text>}
          {item.href ? (
            <Link src={item.href} style={tw("text-gray-700 no-underline")}>
              {item.label}
            </Link>
          ) : (
            <Text style={tw("text-gray-700")}>{item.label}</Text>
          )}
        </View>
      ))}
    </View>
  );
};

interface ResumeRendererProps {
  data: Resume | null;
}

export const ResumeRenderer = ({ data }: ResumeRendererProps) => {
  if (!data) return null;

  return (
    <PDFViewer className="h-full w-full" showToolbar={false}>
      <Document
        title={`${data.name} - Resume`}
        author={data.name}
        subject="Resume"
        keywords="resume, pdf"
        pageLayout="oneColumn"
      >
        <Page size="A4" style={tw("font-sans text-[10pt] text-gray-900 px-12 py-10")}>
          {/* Header */}
          <View style={tw("items-center pb-3 border-b border-gray-300")}>
            <Text style={tw("text-2xl leading-tight font-bold tracking-wide")}>{data.name}</Text>

            {data.headline && (
              <Text style={tw("mt-1 text-sm text-gray-600")}>{data.headline}</Text>
            )}

            <View style={tw("mt-2 items-center text-[9pt]")}>
              <InlineList items={getContactItems(data)} />
              <InlineList items={getSocialItems(data)} />
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};
