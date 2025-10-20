import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import legacyTheme from "../styles/legacyTheme";

interface CalendarProps {
  selectedDate?: string;
  onDateSelect: (date: string) => void;
  minDate?: Date;
  maxDate?: Date;
  disabledDates?: string[];
  markedDates?: { [key: string]: { marked: boolean; dotColor?: string } };
}

interface DayInfo {
  date: string;
  day: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isDisabled: boolean;
  isMarked: boolean;
  dotColor?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  selectedDate,
  onDateSelect,
  minDate = new Date(),
  maxDate,
  disabledDates = [],
  markedDates = {},
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const formatDate = (date: Date): string => {
    return date.toISOString().split("T")[0];
  };

  const isDateDisabled = (date: Date): boolean => {
    const dateStr = formatDate(date);

    // Check if before minDate
    if (minDate && date < minDate) return true;

    // Check if after maxDate
    if (maxDate && date > maxDate) return true;

    // Check if in disabled dates
    if (disabledDates.includes(dateStr)) return true;

    // Disable Sundays (optional - remove if not needed)
    if (date.getDay() === 0) return true;

    return false;
  };

  const generateCalendarDays = (): DayInfo[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: DayInfo[] = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const dateStr = formatDate(date);
      const isCurrentMonth = date.getMonth() === month;
      const isToday = date.getTime() === today.getTime();
      const isSelected = selectedDate === dateStr;
      const isDisabled = isDateDisabled(date);
      const markedInfo = markedDates[dateStr];
      const isMarked = !!markedInfo?.marked;
      const dotColor = markedInfo?.dotColor || legacyTheme.colors.primary;

      days.push({
        date: dateStr,
        day: date.getDate(),
        isCurrentMonth,
        isToday,
        isSelected,
        isDisabled,
        isMarked,
        dotColor,
      });
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDatePress = (dayInfo: DayInfo) => {
    if (!dayInfo.isDisabled && dayInfo.isCurrentMonth) {
      onDateSelect(dayInfo.date);
    }
  };

  const renderDay = (dayInfo: DayInfo) => (
    <DayContainer
      key={dayInfo.date}
      onPress={() => handleDatePress(dayInfo)}
      disabled={dayInfo.isDisabled || !dayInfo.isCurrentMonth}
      activeOpacity={0.7}
    >
      <DayContent
        isSelected={dayInfo.isSelected}
        isToday={dayInfo.isToday}
        isDisabled={dayInfo.isDisabled}
        isCurrentMonth={dayInfo.isCurrentMonth}
      >
        <DayText
          isSelected={dayInfo.isSelected}
          isToday={dayInfo.isToday}
          isDisabled={dayInfo.isDisabled}
          isCurrentMonth={dayInfo.isCurrentMonth}
        >
          {dayInfo.day}
        </DayText>
        {dayInfo.isMarked && dayInfo.isCurrentMonth && (
          <MarkerDot color={dayInfo.dotColor} />
        )}
      </DayContent>
    </DayContainer>
  );

  const calendarDays = generateCalendarDays();

  return (
    <CalendarContainer>
      <CalendarHeader>
        <TouchableOpacity onPress={() => navigateMonth("prev")}>
          <NavigationText>‹</NavigationText>
        </TouchableOpacity>

        <MonthYearText>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </MonthYearText>

        <TouchableOpacity onPress={() => navigateMonth("next")}>
          <NavigationText>›</NavigationText>
        </TouchableOpacity>
      </CalendarHeader>

      <DayNamesContainer>
        {dayNames.map((dayName) => (
          <DayNameText key={dayName}>{dayName}</DayNameText>
        ))}
      </DayNamesContainer>

      <DaysGrid>{calendarDays.map((dayInfo) => renderDay(dayInfo))}</DaysGrid>
    </CalendarContainer>
  );
};

interface DayProps {
  isSelected: boolean;
  isToday: boolean;
  isDisabled: boolean;
  isCurrentMonth: boolean;
}

const CalendarContainer = styled.View`
  background-color: ${legacyTheme.colors.white};
  border-radius: 8px;
  padding: 16px;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  elevation: 3;
`;

const CalendarHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const NavigationText = styled.Text`
  font-size: 24px;
  color: ${legacyTheme.colors.primary};
  font-weight: bold;
  padding: 8px;
`;

const MonthYearText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${legacyTheme.colors.text};
`;

const DayNamesContainer = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
`;

const DayNameText = styled.Text`
  flex: 1;
  text-align: center;
  font-weight: 600;
  color: ${legacyTheme.colors.text};
  font-size: 12px;
  padding: 8px 0;
`;

const DaysGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const DayContainer = styled.TouchableOpacity`
  width: 14.28%;
  aspect-ratio: 1;
  padding: 2px;
`;

const DayContent = styled.View<DayProps>`
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  background-color: ${(props: DayProps) => {
    if (props.isSelected) return legacyTheme.colors.primary;
    if (props.isToday) return legacyTheme.colors.primary + "20";
    return "transparent";
  }};
  opacity: ${(props: DayProps) => {
    if (!props.isCurrentMonth) return 0.3;
    if (props.isDisabled) return 0.3;
    return 1;
  }};
`;

const DayText = styled.Text<DayProps>`
  font-size: 14px;
  font-weight: ${(props: DayProps) => (props.isToday ? "bold" : "normal")};
  color: ${(props: DayProps) => {
    if (props.isSelected) return legacyTheme.colors.white;
    if (props.isDisabled || !props.isCurrentMonth)
      return legacyTheme.colors.text;
    if (props.isToday) return legacyTheme.colors.primary;
    return legacyTheme.colors.text;
  }};
`;

interface MarkerDotProps {
  color?: string;
}

const MarkerDot = styled.View<MarkerDotProps>`
  position: absolute;
  bottom: 4px;
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${(props: MarkerDotProps) =>
    props.color || legacyTheme.colors.primary};
`;

export default Calendar;
