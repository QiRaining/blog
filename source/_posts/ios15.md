title: 如何禁用禁用uwebiview 的反弹功能(bounces)
date: 2013-09-02 08:23:19
tags: [技术]
categories: ios
---
UIWebView默认允许当网页内容处于最顶端时，用户可以用手指往下拖动，露出空白的背景
如何禁用呢
// iOS 5之前

	for (id subview in webView.subviews)
	  if ([[subview class] isSubclassOfClass: [UIScrollView class]])
	    ((UIScrollView *)subview).bounces = NO;
 
// iOS 5+

	webView.scrollView.bounces = NO;