title: 银行支付控件之 自动随机(shuffle)密码键盘的实现算法
date: 2013-08-31 22:05:28
tags: [技术]
categories: ios
---
为了广大用户的支付安全,输入密码的页面密码键盘要用随机排序,因为有版权问题无法把自己写的代码全部贴出 所以下面只把关键的洗牌算法贴出来

##算法一
```
NSMutableArray *randSequence = [[NSMutableArray alloc] initWithCapacity:8];
for (int ii = 0; ii < 10; ++ii)
    [randSequence addObject:[NSNumber numberWithInt:ii]];

for (int ii = 9; ii > -1; --ii) {
    int r = arc4random() % 9
    [randSequence exchangeObjectAtIndex:ii withObjectAtIndex:r];

```
##算法二
```

@interface NSMutableArray (Shuffling)
- (void)shuffle;
@end


//  NSMutableArray_Shuffling.m

#import "NSMutableArray_Shuffling.h"

@implementation NSMutableArray (Shuffling)

- (void)shuffle
{
    NSUInteger count = [self count];
    for (NSUInteger i = 0; i < count; ++i) {
        // Select a random element between i and end of array to swap with.
        NSInteger nElements = count - i;
        NSInteger n = (arc4random() % nElements) + i;
        [self exchangeObjectAtIndex:i withObjectAtIndex:n];
    }
}

@end
```

