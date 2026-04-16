export default function LegacyHtmlPage({ headCss, bodyHtml }) {
  return (
    <>
      {headCss ? (
        <style
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: headCss }}
        />
      ) : null}
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
    </>
  );
}
