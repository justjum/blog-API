const KeywordFilter = ({ setKeyword }) => {
  return (
    <>
      <h3>Keyword Filter</h3>
      <form action="">
        <input
          type="text"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
      </form>
    </>
  );
};

export default KeywordFilter;
