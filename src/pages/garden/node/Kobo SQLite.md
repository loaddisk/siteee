Located in `.kobo/KoboReader.sqlite`

```
sqlite> .tables
AbTest                 KoboPlusAssetGroup     Tab
Achievement            KoboPlusAssets         Wishlist
Activity               OverDriveCards         WordList
AnalyticsEvents        OverDriveCheckoutBook  content
Authors                OverDriveLibrary       content_keys
BookAuthors            Reviews                content_settings
Bookmark               Rules                  ratings
DbVersion              Shelf                  shortcover_page
DropboxItem            ShelfContent           user
Event                  SubscriptionProducts   volume_shortcovers
GDriveItem             SyncQueue              volume_tabs
```

Some important definitions:

- Overdrive and Store bought are functionally equivalent.

## Bookmark

| Column Name              | Description                                                                                                                                                                                                                                                                                                                    |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| BookmarkID               | UUID                                                                                                                                                                                                                                                                                                                           |
| VolumeID                 | - If store bought, UUID. This is the UUID in the store, so it is a stable reference.<br>- If it's a sideloaded book, it looks like `file:///mnt/onboard/path/to/ebook.epub`                                                                                                                                                    |
| ContentID                | - EBooks are often separated into "Chapters". For instance, `xhtml/ch01.xhtml`<br>- If there is no chapter, this value is the same as `VolumeID`<br>- For store bought, the format is like `OEBPS/xhtml/ch01.xhtml`<br>- For sideloaded, it is `mnt/onboard/path/to/ebook.epub!ops!xhtml/ch01.xhtml`. Take note of the `!ops!` |
| StartContainerPath       | - For kepub, it looks like `span#kobo\.28\.1`.<br>- For epub, it looks like `OEBPS/xhtml/chapter1.xhtml#point(/1/4/2/9:1)`<br>- The `#kobo\.28\.1` and `#point(/1/4/2/9:1)` syntax seems fairly stable, no guarentees<br>- I believe these are CSS selectors.                                                                  |
| StartContainerChildIndex | Always `-99` for me                                                                                                                                                                                                                                                                                                            |
| StartOffset              | Probably offset relative to the selected element??                                                                                                                                                                                                                                                                             |
| EndContainerPath         |                                                                                                                                                                                                                                                                                                                                |
| EndContainerChildIndex   |                                                                                                                                                                                                                                                                                                                                |
| EndOffset                | I believe this is relative to the end. Positive value.                                                                                                                                                                                                                                                                         |
| Text                     | The full text of the annotation                                                                                                                                                                                                                                                                                                |
| Annotation               | This is the note, if any. Can be `NULL` or an empty string                                                                                                                                                                                                                                                                     |
| ExtraAnnotationData      | Unknown, always `NULL` for me.                                                                                                                                                                                                                                                                                                 |
| DateCreated              |                                                                                                                                                                                                                                                                                                                                |
| ChapterProgress          | Float between zero and one                                                                                                                                                                                                                                                                                                     |
| Hidden                   | Always false for me. I don't know when it would be true. Hypothesis: it is true when you delete a synced annotation and that deletion needs to sync back to the server. But that's a hypothesis.                                                                                                                               |
| Version                  | I've seen it be `0` and NULL. Seemingly NULL for non-synced.                                                                                                                                                                                                                                                                   |
| DateModified             |                                                                                                                                                                                                                                                                                                                                |
| Creator                  | Always NULL                                                                                                                                                                                                                                                                                                                    |
| UUID                     | Always NULL                                                                                                                                                                                                                                                                                                                    |
| UserID                   |                                                                                                                                                                                                                                                                                                                                |
| SyncTime                 | Possibly null if not yet synced?                                                                                                                                                                                                                                                                                               |
| Published                | Always false for me                                                                                                                                                                                                                                                                                                            |
| ContextString            | I've only seen this set when type is dogear.                                                                                                                                                                                                                                                                                   |
| Type                     | note \| highlight \| dogear                                                                                                                                                                                                                                                                                                    |
### Notes
Really weird one:

```
7ab2b29e-0bda-4d26-b48f-792e131dd67a|31c732b6-e4ff-4932-a6e8-3cef46cb513e|31c732b6-e4ff-4932-a6e8-3cef46cb513e!OEBPS!xhtml/07_Epigraph.xhtml|span#kobo\.1\.1|-99|0|span#kobo\.2\.1|-99|52|Do not go where the path may lead.
                        Go instead where there is no path and leave a trail.||||1.0|false|2518167216574580235|2020-03-30T14:39:02Z|||d10d6022-b808-4c91-a4f5-15f30e0551f0|2020-04-08T17:31:49Z|false||highlight
```