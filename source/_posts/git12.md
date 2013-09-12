title: git错误 git rebase master First, rewinding head to replay your work on top of it... error: The following unt
date: 2013-09-03 13:39:50
tags: [技术]
categories: git
---

git rebase master
First, rewinding head to replay your work on top of it...
error: The following untracked working tree files would be overwritten by checkout:
<!-- more -->
HFFrame.xcodeproj/project.xcworkspace/xcuserdata/apple.xcuserdatad/UserInterfaceState.xcuserstate
Please move or remove them before you can switch branches.
Aborting
could not detach HEAD

执行
```
~/Desktop/HFFrame(example) $ git clean -d -fx ""

```
