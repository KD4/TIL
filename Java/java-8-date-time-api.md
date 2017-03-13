
 작년에 자바를 접하며 처음 개발을 시작했을 때만 해도, 날짜와 시간은 저에게 큰 골칫거리가 아녔습니다.
날짜에 대한 정보가 필요할 때는 대충 Date 클래스를 이용해서 해결하면 될 정도로 간단한 일이었고 이 Date라는 객체가 지독하게 더러운 놈이라는 걸 많은 이들에게 전해 들었지만 '뭐... 문제없던데...?'라는 생각으로 애써 무시했었어요.

 그래서 벌 받았습니다. 꽤 오랫동안...

 일을 하면서 날짜와 시간을 약간이라도 조작해야 하거나, 타임존을 건드려야 하는 문제에서는 번번이 막히고 중요하지 않은 문제에서 시간을 잡아먹으며 개발 퍼포먼스를 떨어트렸습니다.

 그래서 오늘 이 글을 씁니다.

 이 더럽다고 소문난 Java의 레거시 날짜/시간을 버리고 Java 8의 새로운 날짜/시간 API를 확실하게 알기 위해서 http://www.journaldev.com/2800/java-8-date-localdate-localdatetime-instant 의 포스팅 내용을 번역해서 정리합니다.

## JournalDev Java 8 Date Localdate - localdatetime - Instant

Java 8 Date Time API는 개발자들에게 환영받는 Java 8의 변경사항 중 하나입니다.

그동안 Java의 날짜와 시간에 대한 API는 많은 문제가 있었다는 것을 반영하고 있죠.

### Java 8 이전에 Data Time API의 문제점

 새로운 Java 8 API를 배우기 이전에, 우리는 왜 새로운 API가 필요한가에 대한 질문에 답을 해보도록 하겠습니다.

1. Java Date Time 관련 클래스들은 여러 군데 정의돼있습니다. java.util 패키지에도 있고, sql 패키지에도 있죠. 또 formatting과 parsing 관련된 클래스들은 java.text 패키지 안에 정의돼있습니다. 일관성이 없어요...

2. java.util.Date 안에는 date와 time이 있습니다. 반면에 java.sql.Date 안에는 date에 대한 정보만 있어요. 그럼에도 불구하고 두 패키지안에 클래스 이름은 같습니다. 더러운 디자인이죠.

3. 그리고 이 클래스들은 time, timestamp, parsing에 대해서 깊은 고민을 하지 않고 정의되었습니다. 그래서 우리는 java.text.DateFormat 추상 클래스를 사용해야 했습니다. 보통 SimpleDateFormat 클래스를 포맷, 파씽 용도로 사용했습니다.

4. 모든 Date 클래스는 mutable 했습니다. 때문에 thread safe하지 않았어요, 이 이슈는 Java ~7 의 Date, Calendar 클래스들의 가장 큰 문제입니다.

5. Date 클래스는 국제규격을 지원하지 않습니다. timezone을 지원하지 않는다는 의미죠. 때문에 java.util.calender나 TimeZone 클래스들이 소개됐지만, 이 클래스들도 위와 같은 문제들을 가지고 있었습니다.


위에 리스팅 된 문제들 말고도, Date Time API에 설계 관련한 문제가 많았습니다. 때문에 대부분에 프로젝트에서 Joda Time과 같은 Third Party Library를 사용해야 했습니다.

설계에 대한 문제도 한번 살펴봐야 할 문제들입니다. 이 문제들은 네이버 D2 블로그 포스팅을 통해서 확인해주세요!

http://d2.naver.com/helloworld/645609 [Java의 날짜와 시간 API:d2 블로그]

### Java 8 Date과 JSR-310 규약
- Java 8 Date API는 JSR-310 규약을 준수하였습니다. 이 규약은 기존에 date time 구현체들에 문제들을 극복하고자 디자인되었습니다. 다음은 JSR-310 디자인 규칙 중 일부입니다.

1. immutability : 새로운 Date Time API 클래스들은 모두 immutable 해야 합니다.

2. Separation Of Concerns : 새로운 API는 human readable date time과 marchine time ( unix timestamp )의 구현이 명확히 나뉘어 있어야 합니다. Date, Time, DateTime, Timestamp, Timezone이 따로 정의되어 있어야 된다는 것을 뜻합니다.

3. Clarity : 메서드는 모든 클래스에서 같은 action을 보장하도록 정의돼야 합니다. 예를 들어서, 현재 시간에 대한 인스턴스를 얻기 위한 메서드인 now()가 정의된 클래스에는 format()과 parse() 메서드가 같이 정의되어 있어야 합니다.

4. Utility Operations : 모든 클래스는 plus, minus, format, parsing, getting과 같이 일반적인 작업을 하는 메서드들을 포함하고 있어합니다.

5. Extendable : ISO-8601 규약뿐만 아니라 다른 ISO 포맷에서도 작동해야 합니다.

### Java 8 Date Time API 패키지

- java.time Package : 이 패키지는 새로운 Java Date Time의 핵심이 되는 패키지입니다. LocalDate, LocalTime, LocalDateTime, Instant, Period, Duration과 같은 주요한 기본 패키지들이 모두 이 패키지 안에 정의돼있습니다.
- java.time.chrono Package : 이 패키지에는 ISO calender 이 아닌 시스템을 지원하기 위한 패키지입니다.
- java.time.format Package : 이 패키지는 date와 time을 포매팅하고 파씽하기 위한 클래스들이 정의돼있습니다. 대부분의 경우 java.time 패키지가 제공하는 메서드들로 formatting과 parsing이 가능하기 때문에 잘 사용되지 않습니다.
- java.time.temporal Package : 특정 달의 마지막 날짜를 찾고 싶을 때, withXXX라는 메서드를 통해서 확인할 수 있습니다. 이렇듯 특정한 날짜 정보를 얻기 위한 메서드들이 정의된 패키지가 temporal 패키지입니다.
- java.time.zone Package : 이 패키지에는 다른 timezone을 지원하기 위한 클래스들이 포함되어 있습니다.

### Java 8 Date Time API examples
 지금까지 JAVA Date Time API에 중요한 부분들을 살펴보았습니다.

 이제 이 클래스들을 예제 코드들과 함께 살펴보겠습니다.

1. LocalDate
 LocalDate는 기본 포맷이 'yyyy-MM-dd'인 Immutable class입니다. LocalDate의 now()라는 스태틱 메서드를 사용하면 현재 날짜에 대한 Date 객체를 얻을 수 있습니다.
특정 날짜에 대한 LocalDate를 만들기 위해서는 Year, Month 등 아규먼트를 of라는 스태틱 메서드에 넣어줌으로써 LocalDate 인스턴스를 생성할 수 있습니다.
이 클래스는 now() 메서드를 오버로딩하고있는데, 이 오버로딩된 now() 메서드들 중에서 ZoneId를 아규먼트로 넣어서 특정 timezone에 해당하는 현재 날짜도 얻을 수 있습니다.


```java  
import java.time.LocalDate;
import java.time.Month;
import java.time.ZoneId;

public class LocalDateExample {        
    public static void main(String[] args) {

                LocalDate today = LocalDate.now();
                System.out.println("Current Date="+today);

                LocalDate firstDay_2017 = LocalDate.of(2017, Month.JANUARY, 1);                System.out.println("Specific Date="+firstDay_2017);                

               LocalDate todaySeoul = LocalDate.now(ZoneId.of("Asia/Seoul"));                System.out.println("Current Date in KST="+todaySeoul);

               LocalDate dateFromBase = LocalDate.ofEpochDay(365);                System.out.println("365th day from base date= "+dateFromBase);               

                LocalDate hundredDay2014 = LocalDate.ofYearDay(2017, 100);                System.out.println("100th day of 2014="+hundredDay2017);

        }
}
```
```
Current Date=2017-03-04

Specific Date=2017-01-01

Current Date in KST=2017-03-04

365th day from base date= 1971-01-01

100th day of 2017=2017-04-10
```


2. LocalTime
LocalTime은 사람이 읽을 수 있는 포맷으로 시간을 표현해주는 Immutable 클래스입니다. (기본 포맷은 hh:mm:ss.zzz)

LocalDate처럼, 이 클래스도 여러 타임존에 대한 인스턴스를 생성할 수 있고, 시간, 분, 초를 아규먼트로 넣어서 특정 시간에 대한 인스턴스를 생성할 수 있습니다.

```java
import java.time.LocalTime;
import java.time.ZoneId;


public class LocalTimeExample {
    public static void main(String[] args) {

        LocalTime time = LocalTime.now();
        System.out.println("Current Time=" + time);

        LocalTime specificTime = LocalTime.of(12, 20, 25, 40);
        System.out.println("Specific Time of Day=" + specificTime);

        LocalTime timeSeoul = LocalTime.now(ZoneId.of("Asia/Seoul"));
        System.out.println("Current Time in KST=" + timeSeoul);
    }
}
```
```
Current Time=19:13:07.849

Specific Time of Day=12:20:25.000000040

Current Time in KST=19:13:07.849
```


3. LocalDateTime
 LocalDateTime은 immutable 한 날짜-시간 정보를 표현하기 위한 date-time 객체입니다. ( 기본 포맷은 yyyy-MM-dd-HH-mm-ss.zzz )
 
이 클래스는 LocalDate와 LocalTime 객체의 아규먼트를 전달해주는 팩토리 메서드를 제공합니다. 이 클래스의 인스턴스를 생성하는 예제 코드를 봐보시죠!

```java
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.LocalDate;
import java.time.Month;
import java.time.ZoneId;
import java.time.ZoneOffset;

public class LocalDateTimeExample {
    public static void main(String[] args) {

        LocalDateTime today = LocalDateTime.now();
        System.out.println("Current DateTime=" + today);

        today = LocalDateTime.of(LocalDate.now(), LocalTime.now());
        System.out.println("Current DateTime=" + today);

        LocalDateTime specificDate = LocalDateTime.of(2017, Month.JANUARY, 1, 10, 10, 30);
        System.out.println("Specific Date=" + specificDate);

        LocalDateTime todaySeoul = LocalDateTime.now(ZoneId.of("Asia/Seoul"));
        System.out.println("Current Date in UTC=" + todaySeoul);

        LocalDateTime todayUTC = LocalDateTime.now(ZoneId.of("UTC"));

        LocalDateTime dateFromBase = LocalDateTime.ofEpochSecond(10000, 0, ZoneOffset.UTC);
        System.out.println("10000th second time from 01/01/1970= " + dateFromBase);
    }
}

```
```
Current DateTime=2017-03-04T19:22:35.656

Current DateTime=2017-03-04T19:22:35.657

Specific Date=2017-01-01T10:10:30

Current Date in UTC=2017-03-04T19:22:35.657

10000th second time from 01/01/1970= 1970-01-01T02:46:40
```

 위 세 가지 예제에서 유효하지 않은 아규먼트를 팩토리 메서드에 전달했다면, DateTimeException을 던지지만, 이 예외는 RuntimeException입니다.

위 예제에서 ZoneId에 대한 정보를 주면서 특정 타임존에 대한 인스턴스를 생성하곤 했는데, ZoneId에 대한 자세한 내용은 javadoc에서 확인할 수 있습니다.


4. Instant
Instant 클래스는 컴퓨터가 읽을 수 있는 time format을 다루기 위해서 사용됩니다. 이 클래스는 시간 정보를 유닉스 timestamp 값으로 저장하고 있습니다.

```java
import java.time.*;

public class InstantExample {
    public static void main(String[] args) {
        Instant timestamp = Instant.now();
        System.out.println("Current Timestamp = " + timestamp);

        Instant specificTime = Instant.ofEpochMilli(timestamp.toEpochMilli());
        System.out.println("Specific Time = " + specificTime);

        Duration thirtyDay = Duration.ofDays(30);
        System.out.println(thirtyDay);
    }
}
```
```
Current Timestamp = 2017-03-04T10:26:48.244Z

Specific Time = 2017-03-04T10:26:48.244Z

PT720H
```

5 . Java 8 Date API 유틸리티
 앞에서 언급했던 것처럼, 새로운 Java 8의 API는 시간과 날짜를 다루기 위해서 많은 유틸리티 메서드들을 제공합니다.
이 메서드들을 이용해서 현재 date/time 인스턴스의 시간, 날짜를 더하거나 뺄 수 있습니다.
두 날짜 간의 비교를 하거나, 날짜를 조절하는 예제 코드를 봐보겠습니다.

```java
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.Period;
import java.time.temporal.TemporalAdjusters;

public class DateAPIUtilities {
    public static void main(String[] args) {
        LocalDate today = LocalDate.now();
        System.out.println("Year " + today.getYear() + " is Leap Year? " + today.isLeapYear());

        System.out.println("Today is before 01/01/2015? " + today.isBefore(LocalDate.of(2015, 1, 1)));

        System.out.println("Current Time=" + today.atTime(LocalTime.now()));

        System.out.println("10 days after today will be " + today.plusDays(10));
        System.out.println("3 weeks after today will be " + today.plusWeeks(3));
        System.out.println("20 months after today will be " + today.plusMonths(20));
        System.out.println("10 days before today will be " + today.minusDays(10));
        System.out.println("3 weeks before today will be " + today.minusWeeks(3));
        System.out.println("20 months before today will be " + today.minusMonths(20));

        System.out.println("First date of this month= " +                                                 today.with(TemporalAdjusters.firstDayOfMonth()));
        LocalDate lastDayOfYear = today.with(TemporalAdjusters.lastDayOfYear());
        System.out.println("Last date of this year= " + lastDayOfYear);
        Period period = today.until(lastDayOfYear);
        System.out.println("Period Format= " + period);
        System.out.println("Months remaining in the year= " + period.getMonths());
    }
}
```
```
Year 2017 is Leap Year? false

Today is before 01/01/2015? false

Current Time=2017-03-04T19:36:07.692

10 days after today will be 2017-03-14

3 weeks after today will be 2017-03-25

20 months after today will be 2018-11-04

10 days before today will be 2017-02-22

3 weeks before today will be 2017-02-11

20 months before today will be 2015-07-04

First date of this month= 2017-03-01

Last date of this year= 2017-12-31

Period Format= P9M27D

Months remaining in the year= 9
```

6. Java 8 Date Parsing and formatting
기본 날짜 포맷에서 다른 날짜 포맷으로 Date Time object를 변경하는 일을 매우 쉽게 할 수 있습니다. 아래 예제를 봐보죠!

```java
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateParseFormatExample {
    public static void main(String[] args) {

        LocalDate date = LocalDate.now();
        System.out.println("Default format of LocalDate=" + date);
        //specific format
        System.out.println(date.format(DateTimeFormatter.ofPattern("d::MMM::uuuu")));
        System.out.println(date.format(DateTimeFormatter.BASIC_ISO_DATE));
        LocalDateTime dateTime = LocalDateTime.now();
        //default format
        System.out.println("Default format of LocalDateTime=" + dateTime);
        //specific format
        System.out.println(dateTime.format(DateTimeFormatter.ofPattern("d::MMM::uuuu HH::mm::ss")));
        System.out.println(dateTime.format(DateTimeFormatter.BASIC_ISO_DATE));
        Instant timestamp = Instant.now();
        //default format
        System.out.println("Default format of Instant=" + timestamp);
    }
}
```
```
Default format of LocalDate=2017-03-04

4::3월::2017

20170304

Default format of LocalDateTime=2017-03-04T19:45:31.185

4::3월::2017 19::45::31

20170304

Default format of Instant=2017-03-04T10:45:31.185Z
```

7. Java 8 Date APi Legacy Date Time Support

Legacy Date/Time 클래스들은 거의 모든 애플리케이션에서 아직 사용되고 있습니다. 그래서 새로운 DateTimeAPI는 하위 호환성을 보장하고 있습니다.
아래 예제와 같이 몇몇 메서드를 이용해서 Legacy Date/Time과 새로운 Date/Time 인스턴스를 변환할 수 있습니다.

```java
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.TimeZone;

public class DateAPILegacySupport {
    public static void main(String[] args) {
        Instant timestamp = new Date().toInstant();

        LocalDateTime date = LocalDateTime.ofInstant(timestamp, ZoneId.of(ZoneId.SHORT_IDS.get("PST")));
        System.out.println("Date = " + date);

        Instant time = Calendar.getInstance().toInstant();
        System.out.println(time);

        ZoneId defaultZone = TimeZone.getDefault().toZoneId();
        System.out.println(defaultZone);

        ZonedDateTime gregorianCalendarDateTime = new GregorianCalendar().toZonedDateTime();
        System.out.println(gregorianCalendarDateTime);

        Date dt = Date.from(Instant.now());
        System.out.println(dt);
        TimeZone tz = TimeZone.getTimeZone(defaultZone);
        System.out.println(tz);
        GregorianCalendar gc = GregorianCalendar.from(gregorianCalendarDateTime);
        System.out.println(gc);
    }
}
```

```
Date = 2017-03-04T02:53:31.913

2017-03-04T10:53:31.977Z

Asia/Seoul

2017-03-04T19:53:31.987+09:00[Asia/Seoul]

Sat Mar 04 19:53:31 KST 2017

sun.util.calendar.ZoneInfo[id="Asia/Seoul",offset=32400000,dstSavings=0,useDaylight=false,transitions=22,lastRule=null]

java.util.GregorianCalendar[time=1488624811987,areFieldsSet=true,areAllFieldsSet=true,lenient=true,zone=sun.util.calendar.ZoneInfo[
id="Asia/Seoul",offset=32400000,dstSavings=0,useDaylight=false,transitions=22,lastRule=null],firstDayOfWeek=2,minimalDaysInFirstWeek=4,ERA=1,YEAR=2017,MONTH=2,WEEK_OF_YEAR=9,WEEK_OF_MONTH=1,DAY_OF_MONTH=4,DAY_OF_YEAR=63,DAY_OF_WEEK=7,DAY_OF_WEEK_IN_MONTH=1,AM_PM=1,HOUR=7,HOUR_OF_DAY=19,MINUTE=53,SECOND=31,MILLISECOND=987,ZONE_OFFSET=32400000,DST_OFFSET=0]
```


위 내용이 새로운 JAVA 8 API의 전부입니다. 대부분의 새로 나오는 애플리케이션들은 이 새로운 Date/Time API를 사용하게 될 것입니다.
