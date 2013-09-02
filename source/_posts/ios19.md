title: 如何得到中英文混合下的NSString的长度?
date: 2013-09-02 09:21:21
tags: [技术]
categories: ios
---
这个貌似很简单但却是把我跟招行的兄弟难为了好久,为毛?还不是因为招行信用卡中心的网络无法连接外网无法谷歌度娘最后我们只能查看文档写test
下面是最后我们得到的两个方法
<!-- more -->
##方法一:
	- (int)getStringLength:(NSString*)strtemp
	{

	NSStringEncoding enc = CFStringConvertEncodingToNSStringEncoding(kCFStringEncodingGB_18030_2000);

	    NSData* da = [strtemp dataUsingEncoding:enc];

	    return [da length];

	}
##方法二:
	- (int)convertToInt:(NSString*)strtemp

	{

	    int strlength = 0;

	    char* p = (char*)[strtemp cStringUsingEncoding:NSUnicodeStringEncoding];

	    for (int i=0 ; i<[strtemp lengthOfBytesUsingEncoding:NSUnicodeStringEncoding] ;i++) {

	        if (*p) {

	            p++;

	            strlength++;

	        }

	        else {

	            p++;

	        }

	        

	    }

	    return strlength;

	}

