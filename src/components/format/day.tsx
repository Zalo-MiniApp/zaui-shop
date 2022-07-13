function Day({ day }: { day: number }) {
  return <>{['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'][day - 1]}</>;
}

export default Day;