title:  (NSDate) 时间 (time )比较
date: 2013-09-02 08:31:25
tags: [技术]
categories: ios
---
做订餐app时对下单时间的时间判断
下面是规则

*   9:00-14:00 可以订餐
*   14:00以后掌上餐厅仅接收晚餐订餐
*   21:00以后掌上餐厅不接收订餐
  
{%img left http://ww1.sinaimg.cn/mw690/a43af4ffjw1e87ve4c3ynj208q0abt9n.jpg 截图 300 400%}
   
<!-- more -->
---
##转换函数
 将传入的小时和分钟 转换成当日的date

 例如传入 8：00 的str 返回 2013-01-01 08：00 的nsdate

```
-(NSDate *)CurrentDayTime:(NSString *)dataStr

{

    //设置转换的format

    NSDateFormatter *dateFormatter = [[[NSDateFormatteralloc]init]autorelease];

    [dateFormatter setLocale:[NSLocalecurrentLocale]];

    

    [dateFormatter setDateFormat:@"yyyy-MM-dd HH:mm"];

    //获取当前年月日 

    NSDate *currentdate = [NSDatedate];

    NSCalendar *calendar = [NSCalendarcurrentCalendar];

    NSDateComponents *components = [calendarcomponents:(

                                                         NSYearCalendarUnit  |

                                                         NSMonthCalendarUnit |

                                                         NSDayCalendarUnit |

                                                         NSHourCalendarUnit |

                                                         NSMinuteCalendarUnit

                                                         ) fromDate:currentdate];

   NSInteger year = [components year];

   NSInteger month = [components month];

   NSInteger day = [components day];

   NSString *strDate = [NSString stringWithFormat:@"%d-%d-%d %@",year,month,day,dataStr];

   NSDate *date = [dateFormatter dateFromString:strDate];

   return date;

}
```
---
##比较算法

```
NSLog(@"%@\n%@",[selfCurrentDayTime:@"18:00"] ,[NSDatedate]);

    NSDate *date = [NSDatedate];

    if ([datecompare:[selfCurrentDayTime:@"18:00"]] ==NSOrderedDescending)

    {

        NSLog(@"date1 is later than date2");

        

    } else if ([datecompare:[selfCurrentDayTime:@"18:00"]] ==NSOrderedAscending)

    {

        NSLog(@"date1 is earlier than date2");

        

    } else

    {

        NSLog(@"dates are the same");

        

    }
```
##用法如下
```
-(BOOL)checkCanDinner

{

    NSDate *currentDate = [NSDatedate];

    if ([currentDate compare:[selfCurrentDayTime:@"08:59"]] == NSOrderedDescending //late

        && [currentDate compare:[selfCurrentDayTime:@"13:59"]] == NSOrderedAscending //early

        )

    {

        //9:00-14:00 可以订餐

        return YES;

    }

    else if([currentDatecompare:[self CurrentDayTime:@"09:00"]] ==NSOrderedAscending //early

            && [currentDate compare:[selfCurrentDayTime:@"00:00"]] ==  NSOrderedDescending//late

            )

    {

        HFAlert(@"因较多餐厅休息,9:00之前掌上餐厅不接收订餐，为您带来的不便请谅解。");

        return NO;

    }

    else if([currentDatecompare:[self CurrentDayTime:@"17:59"]] ==NSOrderedAscending //early

            && [currentDate compare:[selfCurrentDayTime:@"14:00"]] ==  NSOrderedDescending//late

            )

    {

        HFAlert(@"因较多餐厅休息,14:00以后掌上餐厅仅接收晚餐订餐,为您带来的不便请谅解。");

        return YES;

    }

    else if([currentDatecompare:[self CurrentDayTime:@"21:00"]] ==NSOrderedAscending //early

            && [currentDate compare:[selfCurrentDayTime:@"18:00"]] ==  NSOrderedDescending//late

            )

    {

        //接受晚上的订单

        return YES;

    }

    else if([currentDatecompare:[self CurrentDayTime:@"23:59"]] ==NSOrderedAscending //early

            && [currentDate compare:[selfCurrentDayTime:@"21:00"]] ==  NSOrderedDescending//late

            )

    {

        HFAlert(@"因较多餐厅休息,21:00以后掌上餐厅不接收订餐,为您带来的不便请谅解。");

        return NO;

    }

    return YES;

}
```

