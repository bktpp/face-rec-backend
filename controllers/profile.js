const handleProfile = (req, res, db) => {
   const { id } = req.params;

   db.select("*")
      .from("users")
      .where({
         id,
      })
      .then((user) => {
         if (!user.length) throw new Error("Not found");
         res.json(user[0]);
      })
      .catch((err) => res.status(400).json("Error getting user"));
};
export default handleProfile;
