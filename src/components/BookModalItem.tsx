interface BookModalItem {
  title: string;
  value: string | number;
}
export default function BookModalItem({ title, value }: BookModalItem) {
  return (
    <span>
      <span className="mr-3 rounded-md bg-primary-focus p-1 text-white">
        {title}:
      </span>
      <span>{value}</span>
    </span>
  );
}
