select posts.*, users.id as user_id, users.username, users.profile_pic from posts
join users on users.id = posts.author_id
where users.id != $(userid);
